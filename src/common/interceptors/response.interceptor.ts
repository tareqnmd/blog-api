import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMeta } from '../../modules/pagination/pagination.interface';
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
          const result: ApiResponse<T> = {
            data: apiResponse.data,
            message: apiResponse.message,
            status: apiResponse.status,
            error: apiResponse.error,
          };

          if (apiResponse.meta) {
            result.meta = apiResponse.meta;
          }

          return result;
        }

        // Check if data has meta information (pagination response)
        let responseData: T | null;
        let meta: IMeta | undefined = undefined;

        if (data && typeof data === 'object') {
          if ('data' in data && 'meta' in data) {
            // This is a pagination response with both data and meta
            responseData = (data as { data: T; meta: any }).data;
            meta = (data as { data: T; meta: IMeta }).meta;
          } else if ('data' in data) {
            // This has a data property but no meta
            responseData = (data as { data: T }).data;
          } else {
            // Regular response without nested data
            responseData = data ?? null;
          }
        } else {
          responseData = data ?? null;
        }

        const result: ApiResponse<T> = {
          data: responseData,
          message: this.getSuccessMessage(context, data),
          status: response.statusCode,
          error: false,
        };

        if (meta) {
          result.meta = meta;
        }

        return result;
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
