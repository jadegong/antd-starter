/**
 * 示例接口;
 */
import request from '@/utils/request';
import settings from '../defaultSettings';

const { apiPrefix } = settings

export const productsApi = {
  productsList: apiPrefix + '/products/list',
};

export function productsList(parameter: any) {
  return request({
    url: productsApi.productsList,
    method: 'post',
    data: parameter,
  });
}
