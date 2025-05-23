import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Diagram{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    type : string;

    @Column()
    lastModified : Date;

    @Column()
    code : string;

    @Column()
    imageUrl : string;

    @ManyToOne(()=> User, (user) => user.diagrams)
    user : User;
}