import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DiagramService } from 'src/diagram/diagram.service';
import { DiagramModule } from 'src/diagram/diagram.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports : [TypeOrmModule.forFeature([User]),DiagramModule,AuthModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
