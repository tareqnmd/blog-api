import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
  static success<T>(
    data: T,
    message: string = 'Request completed successfully',
    status: number = 200,
  ): ApiResponse<T> {
    return {
      data: data ?? null,
      message,
      status,
    };
  }

  static error(
    message: string,
    status: number = 500,
    errors?: string[],
  ): ApiResponse {
    return {
      data: null,
      message,
      status,
      errors: errors || [message],
    };
  }

  static created<T>(
    data: T,
    message: string = 'Resource created successfully',
  ): ApiResponse<T> {
    return this.success(data, message, 201);
  }

  static updated<T>(
    data: T,
    message: string = 'Resource updated successfully',
  ): ApiResponse<T> {
    return this.success(data, message, 200);
  }

  static deleted(
    message: string = 'Resource deleted successfully',
  ): ApiResponse {
    return {
      data: null,
      message,
      status: 200,
    };
  }
}
