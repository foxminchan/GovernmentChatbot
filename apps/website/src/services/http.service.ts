import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import { injectable } from 'inversify';
import { axiosConfig } from '../utils/api';
import { IHttpService } from '../@types/interface';
import _omitBy from 'lodash/omitBy';

@injectable()
export default class HttpService implements IHttpService {
  private instance: AxiosInstance;

  constructor(config = axiosConfig) {
    const axiosConfigs = config;

    const instance = axios.create({
      ...axiosConfigs,
    });

    Object.assign(instance, this.setupInterceptorsTo(instance));
    this.instance = instance;
  }

  private setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(
      async (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axiosInstance.interceptors.response.use(
      async (response) => {
        return response.data;
      },
      (error) => {
        if (error.response.status === HttpStatusCode.TooManyRequests) {
          alert('Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
        }
        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }

  public async get<T>(
    url: string,
    config: AxiosRequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    return await this.instance.get<T, ApiResponse<T>>(`${url}`, config);
  }

  public async post<T>(
    url: string,
    data: unknown = undefined,
    config: AxiosRequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    return await this.instance.post<T, ApiResponse<T>>(url, data, config);
  }

  public async put(
    url: string,
    data: unknown = undefined,
    config: AxiosRequestConfig | undefined = undefined
  ): Promise<AxiosResponse<unknown, unknown>> {
    return await this.instance.put(url, data, config);
  }

  public async patch<T>(
    url: string,
    data: unknown = undefined,
    config: AxiosRequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    return await this.instance.patch<T, ApiResponse<T>>(url, data, config);
  }

  public async delete<T>(
    url: string,
    config: AxiosRequestConfig | undefined = undefined
  ): Promise<ApiResponse<T>> {
    return await this.instance.delete<T, ApiResponse<T>>(url, config);
  }

  public setHttpConfigs(config?: Partial<AxiosRequestConfig>) {
    if (config?.baseURL) this.instance.defaults.baseURL = config.baseURL;
    this.instance.defaults = {
      ...this.instance.defaults,
      ..._omitBy(config, 'BaseURL'),
    };
  }
}
