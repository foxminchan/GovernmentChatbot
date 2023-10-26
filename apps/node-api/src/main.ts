import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import fastifyCsrf from '@fastify/csrf-protection';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NotFoundExceptionFilter } from './exceptions';

declare const module: NodeModule & {
  hot?: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      rawBody: true,
      cors: true,
      forceCloseConnections: true,
    }
  );

  app.setGlobalPrefix('api/v1/');
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints),
          }))
        );
      },
    })
  );

  app.register(fastifyCsrf);

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.register(compression, { encodings: ['gzip', 'deflate'] });

  const config = new DocumentBuilder()
    .setTitle('Goverment Chatbot')
    .setDescription(
      'Smart chatbot for streamlined administrative procedures, powered by advanced language models'
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);

  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close();
    });
  }
}

bootstrap();