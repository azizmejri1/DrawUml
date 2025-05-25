import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagram } from './diagram.entity';
import { DiagramController } from './diagram.controller';
import { DiagramService } from './diagram.service';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';

@Module({
    imports : [TypeOrmModule.forFeature([Diagram]),TypeOrmModule.forFeature([User])],
    controllers: [DiagramController],
    providers: [DiagramService]
})
export class DiagramModule {}
