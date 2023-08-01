import { Request, Response } from 'express'
import mockjs from 'mockjs';

export default {
  'POST /api/user/login/sendSms': (req: Request, res: Response) => {
    res.send(
      mockjs.mock({
        status: '0',
        data: {},
        total: 0,
        message: 'success',
      }),
    );
  },
  'POST /api/user/login/mobile': (req: Request, res: Response) => {
    const { body } = req
    const { mobile, captcha, } = body
    let ret
    if (captcha === '1234') {
      ret = mockjs.mock({
        status: '0',
        data: {
          username: 'admin',
          roleType: '1',
          token: '@guid()',
        },
        total: 1,
        message: 'success',
      })
    } else {
      ret = mockjs.mock({
        status: '10000',
        data: {},
        message: '验证码错误',
      })
    }
    res.send(ret);
  },
  'POST /api/user/login/password': (req: Request, res: Response) => {
    const usernames = ['admin']
    const passwords = ['123456789', '123456', '1qaz!QAZ']
    const { body } = req
    const { username, password, } = body
    let ret
    if (usernames.includes(username) && passwords.includes(password)) {
      ret = mockjs.mock({
        status: '0',
        data: {
          username: 'admin',
          roleType: '1',
          token: '@guid()',
        },
        total: 1,
        message: 'success',
      })
    } else {
      ret = mockjs.mock({
        status: '10000',
        data: {},
        message: '账号或密码错误',
      })
    }
    res.send(ret);
  },
  'POST /api/user/logout': (req: Request, res: Response) => {
    res.send(
      mockjs.mock({
        status: '0',
        data: {},
        total: 0,
        message: 'success',
      }),
    );
  },
};
