/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import cookie from 'js-cookie';

export const axios: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:4000'
});

axios.interceptors.request.use(
  (config: any) => {
    const token = cookie.get('jwt');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);
