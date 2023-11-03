import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from 'axios';
import Cookies from 'js-cookie';
import _omitBy from 'lodash/omitBy';
import { injectable } from 'inversify';
import { axiosConfig } from '../utils/api';
import { StorageKeys } from '../@types/keys';
import { IHttpService } from '../@types/interfaces';

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
        const accessToken = Cookies.get(StorageKeys.ACCESS_TOKEN);

        if (accessToken) {
          response.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (response.headers.isRemoveAuthorization) {
          delete response.headers.Authorization;
          delete response.headers.isRemoveAuthorization;
        }

        return response;
      },
      (error) => {
        const statusCode = error?.response?.status;
        switch (statusCode) {
          case HttpStatusCode.Unauthorized: {
            Cookies.remove(StorageKeys.ACCESS_TOKEN);
            window.location.href = '/';
            break;
          }
          case HttpStatusCode.TooManyRequests: {
            alert('Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau');
            break;
          }
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
