export interface ApiResponse<T = any> {
  data: T | null;
  message: string;
  status: number;
  error: boolean;
  errorMessages?: string[];
}
