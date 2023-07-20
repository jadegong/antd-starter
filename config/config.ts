import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      component: '@/layouts/TopMenuOnlyLayout',
      key: 'index',
      label: 'index',
      layout: false,
      wrappers: ['@/wrappers/auth'],
      routes: [
        {
          path: '/docs',
          component: '@/pages/docs',
          key: 'docs',
          label: '文档',
        },
        {
          path: '/products',
          // component: '@/layouts/SideMenuOnlyLayout',
          component: '@/pages/products/index',
          key: 'products',
          label: '产品',
          // routes: [
          //   {
          //     path: '/products/list',
          //     component: '@/pages/products/index',
          //   },
          // ],
        },
      ],
    },
    {
      path: '/user',
      component: '@/layouts/BlankLayout',
      key: 'user',
      label: 'user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          component: '@/pages/user/login',
          key: 'login',
          label: '登录',
        },
      ],
    },
  ],
  npmClient: 'npm',
});
