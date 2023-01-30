import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // nestjs-pino
  //  app.useLogger(app.get(Logger));
  //app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.setGlobalPrefix('/koibanx/v1.0');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: true,
    }),
  );
  const PORT = app.get(ConfigService).get<number>('PORT') || 3000;

  await app.listen(PORT, () => {
    console.info(`Server successfully running on port ${PORT}`);
  });
}
bootstrap();
