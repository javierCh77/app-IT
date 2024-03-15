import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as moment from 'moment-timezone';





async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  // Configura la zona horaria del servidor
  moment.tz.setDefault('America/Argentina/Buenos_Aires');
  
  
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  
  app.enableCors();
  
 
  await app.listen(3001);
}
bootstrap();
