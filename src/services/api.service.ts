import axios, {
  AxiosHeaders,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import type { ImageType } from '../screens/SaveImage';

const BASE_URL = 'http://10.0.2.2:3000/';

const api = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

api.interceptors.request.use(
  function (
    config: AxiosRequestConfig<AxiosHeaders>,
  ): AxiosRequestConfig<AxiosHeaders> {
    config.headers!['Accept'] = 'application/json';
    config.headers!['Content-Type'] = 'application/json';
    return config;
  },
  function (error): Promise<Error> {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error): Promise<Error> {
    return Promise.reject(error);
  },
);

export class API {
  static getImages(url: string): AxiosPromise<ImageType[]> {
    return api.get(url);
  }

  static addImage(
    url: string,
    body: ImageType,
  ): AxiosPromise<ImageType> {
    return api.post(BASE_URL + url, body);
  }
}
