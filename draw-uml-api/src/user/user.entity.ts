import { Diagram } from "src/diagram/diagram.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    username : string;
    
    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @OneToMany(()=> Diagram , (diagram) => diagram.user)
    diagrams : Diagram[];
    
}