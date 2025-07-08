import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://d3vkn91yiky8ht.cloudfront.net',
      // 'https://todo-app2025-frontend.s3-website.eu-north-1.amazonaws.com', 
      'https://localhost:3000',
      'https://localhost'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
