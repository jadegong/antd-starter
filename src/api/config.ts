import request from '@/utils/request';

const baseUrl = '/api'; // 开发

const apiConfig = {
  upload: baseUrl + '/upload',
};

function customRequest(url: String, type: String, parameter = {}, path: any, id: any) {
  if (path) url += `/${path}`;
  if (id) url += `/${id}`;

  let obj;
  if (type === 'get') {
    obj = {
      url: url,
      method: type,
      params: parameter,
    };
  } else {
    obj = {
      url: url,
      method: type,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      data: parameter,
    };
  }
  return request(obj);
}

function requestPost(url: String, data: any) {
  return request({
    url: url,
    method: 'post',
    data: data,
  });
}

export { baseUrl, apiConfig, customRequest, requestPost };
