import { Request, Response } from 'express'
import mockjs from 'mockjs';

export default {
  'POST /api/products/list': (req: Request, res: Response) => {
    res.send(
      mockjs.mock({
        status: '0',
        'data|10': [
          {
            id: '@id()',
            name: '@cword(3, 5)',
          },
        ],
        total: 30,
        message: 'success',
      }),
    );
  },
};
