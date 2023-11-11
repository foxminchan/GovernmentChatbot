type ApiResponse<T = unknown> = {
  data: T;
  isError: boolean;
  errorMessage: unknown;
};

type PagingOptions = {
  Page: number;
  PageLimit: number;
  Sort: string;
  OrderBy: string;
};
