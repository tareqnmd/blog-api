export interface IPagination<T> {
  meta: {
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  data: T[];
}
