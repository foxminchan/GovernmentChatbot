import { AxiosRequestConfig } from 'axios';

const commonConfig: AxiosRequestConfig = {
  baseURL: process.env.API_BASEURL,
  withCredentials: true,
  timeout: 10000,
};

const axiosConfig = (): AxiosRequestConfig => {
  return commonConfig;
};

export default axiosConfig;
