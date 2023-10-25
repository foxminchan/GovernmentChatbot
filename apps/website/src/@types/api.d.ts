type ApiResponse<T = unknown> = {
  data: T;
  isError: boolean;
  errorMessage: unknown;
};
