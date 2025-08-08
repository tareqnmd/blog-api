export interface ApiResponse<T = any> {
  data?: T;
  message: string;
  status: number;
  error?: string | object;
}
