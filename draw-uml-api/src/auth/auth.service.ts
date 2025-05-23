import { Injectable } from '@nestjs/common';
import { LoginDto } from './LoginDto';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,private jwtService: JwtService){}

    async login(loginDto: LoginDto) {
        const {email , password} = loginDto;
        const user = await this.userRepository.findOne({where : {email : email}});
        if(!user){
            return {"message":"user does not exist"};
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return {"message":"wrong password"};
        }

        const payload = { sub: user.id, username: user.email };
        return {
        access_token: await this.jwtService.signAsync(payload),id:user.id,name:user.username,
        };
    } 
}
