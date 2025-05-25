import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DiagramService } from 'src/diagram/diagram.service';
import { DiagramModule } from 'src/diagram/diagram.module';

@Module({
    imports : [TypeOrmModule.forFeature([User]),DiagramModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
