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
import helmet from '@fastify/helmet';
import otelSDK from './instrumentation';
import { NestFactory } from '@nestjs/core';
import compression from '@fastify/compress';
import { SetupSwagger } from './frameworks';
import { AppModule } from './modules/app.module';
import fastifyCsrf from '@fastify/csrf-protection';
import { HttpExceptionFilter } from './libs/filters';

declare const module: NodeModule & {
  hot?: {
    accept: () => void;
    dispose: (callback: () => void) => void;
  };
};

async function bootstrap() {
  otelSDK.start();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      rawBody: true,
      cors: true,
      forceCloseConnections: true,
      snapshot: true,
      bufferLogs: true,
    }
  );

  app.register(fastifyCsrf);
  app.register(compression, { encodings: ['gzip', 'deflate'] });
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

  app.setGlobalPrefix('api/v1/');
  app.useGlobalFilters(new HttpExceptionFilter());
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

  app.enableShutdownHooks();

  SetupSwagger(app);

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close();
    });
  }
}

void (async (): Promise<void> => {
  try {
    await bootstrap();
    Logger.log(`🚀 Application is running`);
  } catch (error) {
    Logger.error(error, '❌ Error starting server');
  }
})();
