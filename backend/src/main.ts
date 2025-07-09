import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://duv4josean1c1.cloudfront.net',
      'https://localhost:3000',
      'https://localhost',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
