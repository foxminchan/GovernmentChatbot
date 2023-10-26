import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';

@Catch(NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = _exception.getStatus();

    const message = _exception.getResponse() as {
      key: string;
      args: Record<string, unknown>;
    };

    response.status(statusCode).json({
      statusCode,
      message: {
        key: message.key,
        args: message.args,
      },
    });
  }
}
