import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: string[] = ['An unexpected error occurred'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        errors = [exceptionResponse];
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message =
          (responseObj.message as string) ||
          (responseObj.error as string) ||
          exception.message;

        // Handle different error formats
        if (Array.isArray(responseObj.message)) {
          errors = responseObj.message as string[];
        } else if (Array.isArray(responseObj.errors)) {
          errors = responseObj.errors as string[];
        } else if (responseObj.message) {
          errors = [responseObj.message as string];
        } else if (responseObj.error) {
          errors = [responseObj.error as string];
        } else {
          errors = [exception.message];
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errors = [exception.message];
    }

    // Log the error
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    const errorResponse: ApiResponse = {
      data: null,
      message,
      status,
      errors,
    };

    response.status(status).json(errorResponse);
  }
}
