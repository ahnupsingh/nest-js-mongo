import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

var allowed_origins = [
  'https://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5000',
  undefined, //for test i.e. postman
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.enableCors({
    origin: function (origin, callback) {
      if (allowed_origins.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET, POST, DELETE, PUT, PATCH, HEAD, POST, OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('Employees')
    .setDescription('seriea application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001, () => {
    return logger.log(`Application is up and running on port: 3001 🚀`);
  });
}
bootstrap();
