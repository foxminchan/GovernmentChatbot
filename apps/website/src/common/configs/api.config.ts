import { AxiosRequestConfig } from 'axios';

const axiosConfig = (): AxiosRequestConfig => {
  return {
    baseURL: import.meta.env.DEV
      ? import.meta.env.VITE_DEV_DOMAIN
      : import.meta.env.VITE_PROD_DOMAIN,
    withCredentials: true,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export { axiosConfig };
