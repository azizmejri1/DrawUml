import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './UserDto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,){}

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

}
