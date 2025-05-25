import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });
  app.useStaticAssets(join(__dirname, '..', './content'));
  app.enableCors({ origin: true, credentials: true });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
