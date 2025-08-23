export interface IPagination<T> {
  meta: {
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    last: string;
    next: string;
    previous: string;
    current: string;
  };
  data: T[];
}
