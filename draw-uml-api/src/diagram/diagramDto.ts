import { IsString } from "class-validator";

export class DiagramDto{

    @IsString()
    description : string;

    @IsString()
    type : string;

    
}