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
    let errorMessages: string[] = ['An unexpected error occurred'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        // Simple string response
        message = exceptionResponse;
        errorMessages = [exceptionResponse];
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as Record<string, unknown>;

        // Handle validation pipe errors (class-validator)
        if (Array.isArray(responseObj.message)) {
          errorMessages = responseObj.message.map((msg) => String(msg));
          message = `Validation failed: ${errorMessages.join(', ')}`;
        }
        // Handle custom errors array
        else if (Array.isArray(responseObj.errors)) {
          errorMessages = responseObj.errors.map((err) => String(err));
          message =
            (responseObj.message as string) ||
            errorMessages[0] ||
            'Request failed';
        }
        // Handle single error message (NotFoundException, BadRequestException, etc.)
        else if (responseObj.message) {
          message = responseObj.message as string;
          errorMessages = [message];
        }
        // Fallback for other object structures
        else if (responseObj.error) {
          message = responseObj.error as string;
          errorMessages = [message];
        } else {
          message = exception.message || 'Request failed';
          errorMessages = [message];
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message || 'An error occurred';
      errorMessages = [message];
    } else {
      message = 'An unexpected error occurred';
      errorMessages = [message];
    }

    // Log the error
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    const errorResponse: ApiResponse = {
      data: null,
      message,
      status,
      error: true,
      errorMessages,
    };

    response.status(status).json(errorResponse);
  }
}
