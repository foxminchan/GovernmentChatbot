import {
  ValidationPipe,
  type INestApplication,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { HttpExceptionFilter } from './filters';

export function middleware(app: INestApplication): INestApplication {
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

  return app;
}
