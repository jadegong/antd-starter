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
