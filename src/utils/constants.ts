/**
 * 常量;
 * v0.0.1 2023/07/17 gqd New File;
 *        2023/07/19 gqd 增加常用正则表达式;
 */
export default {
  REQUEST_STATUS: {
    SUCCESS: '0',
    ERROR: {
      NEED_LOGIN: '10001', // 需要重新登录
    },
  },
  MUTATION_TYPES: {
    ACCESS_TOKEN: 'Access-Token',
    USER_INFO_SESSION_STORAGE: 'USER_INFO_SESSION_STORAGE',
  },
  REGEXP: {
    // 正则表达式常量：包含手机号、邮箱等
    PHONE: /^1(3([0-35-9]\d|4[1-8])|4[14-9]\d|5([0-35689]\d|7[1-79])|66\d|7[2-35-8]\d|8\d{2}|9[13589]\d)\d{7}$/,
    MAIL: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
};
