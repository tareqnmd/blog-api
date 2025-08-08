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
      error: false,
    };
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
      error: false,
    };
  }
}
