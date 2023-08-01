/**
 * 示例接口;
 */
import request from '@/utils/request';
import settings from '../defaultSettings';

const { apiPrefix } = settings

export const productsApi = {
  productsList: apiPrefix + '/products/list',
  productsCategory: apiPrefix + '/products/category',
};

export function productsList(parameter: any) {
  return request({
    url: productsApi.productsList,
    method: 'post',
    data: parameter,
  });
}

export function productsCategory(parameter: any) {
  return request({
    url: productsApi.productsCategory,
    method: 'post',
    data: parameter,
  });
}

