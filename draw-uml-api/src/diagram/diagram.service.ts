import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as plantumlEncoder from 'plantuml-encoder';
import { DiagramDto } from './diagramDto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
import { Diagram } from './diagram.entity';

@Injectable()
export class DiagramService {
  constructor(private config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Diagram) private readonly diagramRepository: Repository<Diagram>,
    private jwtService: JwtService) {}

  async generateUml(diagramDto: DiagramDto,req:Request): Promise<string> {
    const { description, type } = diagramDto;
    const prompt =
      'You are a PlantUML generator. Based on the following system description, generate the appropriate UML diagram using PlantUML syntax. The diagram type is:' +
      type +
      '.System Description:' +
      description +
      'Output only valid PlantUML code between @startuml and @enduml. Do not add any explanations or markdown syntax.';
    const apiKey = this.config.get<string>('API_KEY');
    const jwt = req.cookies?.jwt;
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-r1-zero:free',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: 'Bearer ' + apiKey,
            'Content-Type': 'application/json',
          },
        }
      );
      const imageUrl = await this.addDiagram(response.data.choices[0].message.content);
      if(jwt){
          await this.saveDiagram(description,type,jwt,response.data.choices[0].message.content,imageUrl)
      }
      return await this.addDiagram(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      throw new Error(`Failed to generate UML diagram: ${error.message}`);
    }
  }

  async saveDiagram(description:string,type:string,jwt:string,code:string,imageUrl:string){
      const payload = await this.jwtService.verifyAsync(
          jwt,
          {
            secret: jwtConstants.secret
          }
          );
          const user = await this.userRepository.findOne({ where: { id: payload.sub } });
          if (!user) {
            throw new Error("user does not exist");
          }
          const diagram = new Diagram();
          diagram.type = type; 
          diagram.lastModified = new Date(); 
          diagram.code = code;
          diagram.imageUrl = imageUrl;
          diagram.user = user;
          this.diagramRepository.save(diagram);
  }

  async addDiagram(plantUml: string): Promise<string> {
    const match = plantUml.match(/```plantuml([\s\S]*?)```/); // Extract PlantUML block
    if (!match) {
      throw new Error('No PlantUML code block found in input.');
    }
    const plantUmlCode = match[1]
      .replace(/\\n/g, '\n') // Convert \n to real newlines
      .replace(/^\\boxed\{\n/, '') // Remove boxed if present
      .trim();
    try {
      // Encode PlantUML code
      const encoded = plantumlEncoder.encode(plantUmlCode);

      // Generate SVG content from PlantUML server
      const plantUmlServerUrl = `http://www.plantuml.com/plantuml/svg/${encoded}`;
      const response = await fetch(plantUmlServerUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch SVG from PlantUML server: ${response.statusText}`);
      }

      const svgContent = await response.text();

      // Define output directory and file path
      const outputDir = path.join(process.cwd(), 'content');
      const fileName = `diagram-${Date.now()}.svg`;
      const filePath = path.join(outputDir, fileName);

      // Ensure content directory exists
      await fs.ensureDir(outputDir);

      // Save SVG to file
      await fs.writeFile(filePath, svgContent);

    
      
      console.log(fileName);
      return `${fileName}`;
    } catch (error) {
      throw new Error(`Failed to generate or save diagram: ${error.message}`);
    }
  }
}