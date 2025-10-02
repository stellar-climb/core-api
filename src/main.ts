import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from '@libs/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(3000, () => {
    console.log(`Server is running on port 3000.`);
  });
}
bootstrap();
