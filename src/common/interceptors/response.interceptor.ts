import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: T) => {
        if (
          data &&
          typeof data === 'object' &&
          'status' in data &&
          'message' in data &&
          'data' in data &&
          'error' in data
        ) {
          // If response already has the full structure, extract data from data field
          const apiResponse = data as ApiResponse<T>;
          return {
            data: apiResponse.data,
            message: apiResponse.message,
            status: apiResponse.status,
            error: apiResponse.error,
          };
        }

        // If data has a 'data' property, use the content inside data
        let responseData: T | null;
        if (data && typeof data === 'object' && 'data' in data) {
          responseData = (data as { data: T }).data;
        } else {
          responseData = data ?? null;
        }

        return {
          data: responseData,
          message: this.getSuccessMessage(context, data),
          status: response.statusCode,
          error: false,
        };
      }),
    );
  }

  private getSuccessMessage<T>(context: ExecutionContext, data: T): string {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;

    if (data && typeof data === 'object' && 'message' in data) {
      return (data as { message: string }).message;
    }

    switch (method) {
      case 'POST':
        return 'Resource created successfully';
      case 'PUT':
        return 'Resource updated successfully';
      case 'PATCH':
        return 'Resource updated successfully';
      case 'DELETE':
        return 'Resource deleted successfully';
      case 'GET':
      default:
        return 'Request completed successfully';
    }
  }
}
