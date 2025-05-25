import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './UserDto';
import * as bcrypt from 'bcrypt';
import { DiagramService } from 'src/diagram/diagram.service';
import { Response } from 'express';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,private readonly diagramService : DiagramService){}

    async createUser(userDto: UserDto){
        const {firstName,lastName,username,email,password} = userDto;

        const user = await this.userRepository.findOne({where : {email : email}});

        if(user){
            return {"message":"user already exist"};
        }

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const newUser = this.userRepository.create({ firstName, lastName, username, email, password: hashedPassword })
        this.userRepository.save(newUser);
        return {"message":"user created"};
    }

    async getUserById(id : number){
        const user = await this.userRepository.findOne({where : {id}});
        return user;
    }

    async deleteUser(id: number,res: Response){
        await this.diagramService.deleteDiagramByUser(id);
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} does not exist`);
        }
        res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
       });
    }

    async updateUser(id: number, updateData: Partial<User>): Promise<User> {
        
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
        throw new NotFoundException(`User with ID ${id} does not exist`);
        }

        
        Object.assign(user, updateData);

        
        return this.userRepository.save(user);
    }

}
