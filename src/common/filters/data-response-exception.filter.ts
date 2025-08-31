import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class DataResponseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let message: ApiResponse['message'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const { message: responseMessage } = exceptionResponse as Record<
          string,
          any
        >;
        message =
          Array.isArray(responseMessage) || typeof responseMessage === 'string'
            ? responseMessage
            : exception.message;
      } else {
        message = String(exceptionResponse);
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const apiResponse: ApiResponse<null> = {
      data: null,
      message,
      status,
      error: true,
    };

    response.status(status).json(apiResponse);
  }
}
