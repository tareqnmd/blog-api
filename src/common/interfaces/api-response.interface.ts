import { IMeta } from 'src/modules/pagination/pagination.interface';

export interface ApiResponse<T = any> {
  data: T | null;
  message: string | string[];
  status: number;
  error: boolean;
  meta?: IMeta;
}
