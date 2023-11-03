import { INestApplication } from '@nestjs/common';
import { swaggerOptions } from './swagger.plugin';
import {
  IS_PUBLIC_KEY_META,
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
  SWAGGER_VERSION,
  license,
} from '../../libs/@types/constants';
import { getMiddleware } from 'swagger-stats';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isArray } from 'helper-fns';

export function SetupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .setLicense(license.NAME, license.URL)
    .addBearerAuth()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken'
    )
    .addApiKey({ type: 'apiKey', in: 'header', name: 'X-Api-Key' }, 'apiKey')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const paths = Object.values(document.paths);

  for (const path of paths) {
    const methods = Object.values(path);

    for (const method of methods) {
      if (
        isArray(method.security) &&
        method.security.includes(IS_PUBLIC_KEY_META)
      )
        method.security = [];
    }
  }

  app.use(
    getMiddleware({
      swaggerSpec: document,
      authentication: true,
      uriPath: '/stats',
    })
  );

  SwaggerModule.setup('/', app, document, {
    swaggerOptions,
  });
}
