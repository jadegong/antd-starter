import { defineConfig } from 'umi';
import settings from '../src/defaultSettings'
// import {
//   AppstoreOutlined,
//   FileWordOutlined,
//   UnorderedListOutlined,
// } from '@ant-design/icons'

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
          path: '/',
          redirect: '/docs',
        },
        {
          path: '/docs',
          component: '@/pages/docs',
          key: 'docs',
          label: '文档',
          // icon: FileWordOutlined,
        },
        {
          path: '/products',
          component: '@/layouts/SideMenuOnlyLayout',
          key: 'products',
          label: '产品',
          // icon: AppstoreOutlined,
          routes: [
            {
              path: '/products',
              redirect: '/products/list',
            },
            {
              path: '/products/list',
              component: '@/pages/products/index',
              key: 'productsList',
              label: '产品列表',
            },
            {
              path: '/products/category',
              component: '@/pages/products/ProductsCategory',
              key: 'productsCategory',
              label: '产品分类',
            },
          ],
        },
      ],
    },
    {
      path: '/user',
      component: '@/layouts/BlankLayout',
      key: 'user',
      label: '用户',
      layout: false,
      routes: [
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          path: '/user/login',
          component: '@/pages/user/login',
          key: 'login',
          label: '登录',
        },
      ],
    },
  ],
  base: settings.packageName + '/',
  outputPath: '.' + settings.packageName,
  npmClient: 'npm',
});
