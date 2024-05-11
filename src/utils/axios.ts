import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 6000,
});

instance.interceptors.request.use(
  config => {
    // console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    // console.log(response);
    return Promise.resolve(response.data);
  },
  error => {
    console.warn(error);
    return Promise.reject(error);
  }
);

export default instance;
