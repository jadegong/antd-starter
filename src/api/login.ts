/**
 * 登录接口;
 * v0.0.1 2023/07/19 gqd new file;
 */
import request from '@/utils/request';
import settings from '../defaultSettings';

const { apiPrefix } = settings

export const loginApi = {
  // 账号密码登录
  getSliderImg: apiPrefix + '/user/login/getSliderImg',
  passwordLogin: apiPrefix + '/user/login/password',
  // 手机号登录
  sendSmsCode: apiPrefix + '/user/login/sendSms',
  mobileLogin: apiPrefix + '/user/login/mobile',
};

export function getSliderImg(parameter: any) {
  return request({
    url: loginApi.getSliderImg,
    method: 'post',
    data: parameter,
  });
}

export function passwordLogin(parameter: any) {
  return request({
    url: loginApi.passwordLogin,
    method: 'post',
    data: parameter,
  });
}

export function mobileLogin(parameter: any) {
  return request({
    url: loginApi.mobileLogin,
    method: 'post',
    data: parameter,
  });
}

export function sendSmsCode(parameter: any) {
  return request({
    url: loginApi.sendSmsCode,
    method: 'post',
    data: parameter,
  });
}




