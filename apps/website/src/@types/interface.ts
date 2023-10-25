import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IHttpService {
  get<T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<ApiResponse<T>>;

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined
  ): Promise<ApiResponse<T>>;

  put(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<unknown, unknown>>;

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined
  ): Promise<ApiResponse<T>>;

  delete<T>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<ApiResponse<T>>;

  setHttpConfigs(config?: Partial<AxiosRequestConfig>): void;
}
