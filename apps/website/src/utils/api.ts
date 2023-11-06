import { AxiosRequestConfig } from 'axios';

const commonConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_DEV_DOMAIN,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosConfig = (): AxiosRequestConfig => {
  return commonConfig;
};

export { axiosConfig };
