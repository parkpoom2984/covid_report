import axios from 'axios';
import Apis from '~/src/common/apis';
import stores from '~/src/stores';

export const api = axios.create({
  baseURL: Apis.baseURL,
});

api.interceptors.request.use(
  config => {
    if (!stores.loading.disable) {
      stores.loading.startLoading();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    stores.loading.stopLoading();
    return response;
  },
  error => {
    console.log('error response: ', error.response);
    stores.loading.stopLoading();
  },
);
