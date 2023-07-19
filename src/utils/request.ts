/**
 * 统一的请求处理;
 * v0.0.1 2023/07/17 gqd New File;
 */
import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import constants from './constants';

import { notification } from 'antd';

const { ACCESS_TOKEN, USER_INFO_SESSION_STORAGE } = constants.MUTATION_TYPES;

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 * 5, // 请求超时时间
  // headers: { 'Content-Type': 'application/json' },
});
request.defaults.headers.post['Content-Type'] = 'application/json';

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  const resObj = error.response;
  if (error.response) {
    const data = error.response.data;
    // 暂时的错误处理
    notification.error({
      message: resObj?.status,
      description: (data && data.message) || resObj?.statusText,
    });
  }
  return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const token = sessionStorage.getItem(ACCESS_TOKEN);
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token;
  }
  // v1.5.6 2023/01/13 gqd 上传文件的headers统一使用form格式;
  if (config.method === 'post' && config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
  }
  return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response: AxiosResponse<any, any>) => {
  const data = response.data;
  if (
    response.request?.responseType === 'blob' &&
    data instanceof Blob &&
    data.type === 'application/json'
  ) {
    // 下载文件返回json一定是出错了
    let fr = new FileReader();
    fr.onload = function (event) {
      let dataJsonStr = event.target?.result;
      let dataJson = JSON.parse(dataJsonStr?.toString() || '');
      notification.error({
        message: '请求出错',
        description: dataJson.message || dataJson.msg || '',
      });
    };
    fr.readAsText(data);
    return {
      type: 'application/json',
    };
  }
  if (data?.status) {
    if (data.status !== constants.REQUEST_STATUS.SUCCESS) {
      notification.error({
        message: '请求出错',
        description: data.message || data.msg || '',
      });
    }
    if (data.status === constants.REQUEST_STATUS.ERROR.NEED_LOGIN) {
      setTimeout(() => {
        sessionStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem(USER_INFO_SESSION_STORAGE);
        window.location.reload();
        // window.location.href = `${config.routerBase}user/login`;
      }, 2500);
    }
  }
  // 下载文件接口需要从response.headers中获取文件名
  const disposition = response.headers['content-disposition'];
  if (disposition) {
    // 下载文件接口需要从response.headers中获取文件名
    return {
      blob: response.data,
      fileName: decodeURI(disposition.split(';')[1].split('filename=')[1]),
    };
  }
  return response.data;
});

export default request;
