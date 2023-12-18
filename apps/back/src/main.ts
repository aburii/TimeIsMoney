import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { GlobalResponseInterceptor } from './interceptors/global.interceptor';
import { PrismaClientExceptionFilter } from './filters/prisma.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: JSON.parse(process.env.ALLOWED_ORIGINS),
    credentials: true,
  });
  app.use(cookieParser());
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
