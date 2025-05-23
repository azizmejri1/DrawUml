import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DiagramModule } from './diagram/diagram.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available app-wide
    }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: config.get<'postgres'>('DB_TYPE'),
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      autoLoadEntities : true, // Entities
      synchronize: true, // WARNING: disable in production
    }),
  }),UserModule, DiagramModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
