import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // nestjs-pino
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.setGlobalPrefix('/uploads/v1.0');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: true,
    }),
  );
  const PORT = app.get(ConfigService).get<number>('PORT') || 3000;
  await app.listen(PORT, () => {
    app.get(Logger).log(`Server successfully running on port ${PORT}`);
  });
}
bootstrap();
