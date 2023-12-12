import axios from "axios";

// 创建请求实例
const service = axios.create({
  baseURL: "/api",
  // 指定请求超时的毫秒数
  timeout: 20000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 响应拦截器
service.interceptors.request.use(
  (config) => {
    // 可以在此处对请求进行一些处理
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.data) {
      return Promise.reject(error);
    }
    const { message } = error;
    console.error(message);
    return Promise.reject(error);
  }
);

export default service;
