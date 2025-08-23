import { IMeta } from 'src/modules/pagination/pagination.interface';
import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
  static success<T>(
    data: T,
    message: string = 'Request completed successfully',
    status: number = 200,
    meta?: IMeta,
  ): ApiResponse<T> {
    const response: ApiResponse<T> = {
      data: data ?? null,
      message,
      status,
      error: false,
    };

    if (meta) {
      response.meta = meta;
    }

    return response;
  }

  static error(
    message: string,
    status: number = 500,
    errorMessages?: string[],
  ): ApiResponse {
    return {
      data: null,
      message,
      status,
      error: true,
      errorMessages: errorMessages || [message],
    };
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully',
    meta?: IMeta,
  ): ApiResponse<T> {
    return this.success(data, message, 201, meta);
  }

  static updated<T>(
    data: T,
    message: string = 'Resource updated successfully',
    meta?: IMeta,
  ): ApiResponse<T> {
    return this.success(data, message, 200, meta);
  }

  static deleted(
    message: string = 'Resource deleted successfully',
  ): ApiResponse {
    return {
      data: null,
      message,
      status: 200,
      error: false,
    };
  }
}
