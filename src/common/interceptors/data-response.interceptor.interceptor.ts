import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { IMeta } from 'src/modules/pagination/pagination.interface';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class DataResponseInterceptor<T>
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
          const apiResponse = data as ApiResponse<T>;
          const result: ApiResponse<T> = {
            data: apiResponse.data ?? null,
            message: apiResponse.message,
            status: apiResponse.status,
            error: apiResponse.error,
          };

          if (apiResponse.meta) {
            result.meta = apiResponse.meta;
          }

          return result;
        }

        let responseData: T | null;
        let meta: IMeta | undefined = undefined;

        if (data && typeof data === 'object') {
          if ('data' in data && 'meta' in data) {
            responseData = (data as { data: T; meta: any }).data;
            meta = (data as { data: T; meta: IMeta }).meta;
          } else if ('data' in data) {
            responseData = (data as { data: T }).data;
          } else {
            responseData = data ?? null;
          }
        } else {
          responseData = data ?? null;
        }

        const result: ApiResponse<T> = {
          data: responseData,
          message: 'Request completed successfully',
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
}
