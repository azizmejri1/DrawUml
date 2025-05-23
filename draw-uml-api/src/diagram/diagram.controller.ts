import { Body, Controller, Post } from '@nestjs/common';
import { Diagram } from './diagram.entity';
import { DiagramDto } from './diagramDto';
import { DiagramService } from './diagram.service';

@Controller('diagram')
export class DiagramController {

    constructor(private readonly diagramService : DiagramService){}
    
    @Post("generate")
    async generateUml(@Body() diagramDto : DiagramDto){
        return this.diagramService.generateUml(diagramDto);
    }
}
