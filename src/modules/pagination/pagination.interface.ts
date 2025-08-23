export interface IMeta {
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface IPagination<T> {
  meta: IMeta;
  data: T[];
}
