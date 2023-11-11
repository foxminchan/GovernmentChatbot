type ApiResponse<T = unknown> = {
  data: T;
};

type PagingOptions = {
  Page: number;
  PageLimit: number;
  Sort: SortType;
  OrderBy: string;
};

enum SortType {
  Ascending = 'ASC',
  Descending = 'DESC',
}
