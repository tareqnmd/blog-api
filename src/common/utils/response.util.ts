import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
  static success<T>(
    data: T,
    message: string = 'Request completed successfully',
    status: number = 200,
  ): ApiResponse<T> {
    return {
      data,
      message,
      status,
    };
  }

  static error(
    message: string,
    status: number = 500,
    error?: string | object,
  ): ApiResponse {
    return {
      message,
      status,
      error: error || message,
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
      message,
      status: 200,
    };
  }
}
