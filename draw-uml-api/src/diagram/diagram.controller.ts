import { Body, Controller, Post, Req } from '@nestjs/common';
import { Diagram } from './diagram.entity';
import { DiagramDto } from './diagramDto';
import { DiagramService } from './diagram.service';
import { Request } from 'express';
@Controller('diagram')
export class DiagramController {

    constructor(private readonly diagramService : DiagramService){}
    
    @Post("generate")
    async generateUml(@Body() diagramDto : DiagramDto, @Req() req : Request){
        return this.diagramService.generateUml(diagramDto,req);
    }
}
