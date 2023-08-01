/**
 * 配置各个路由菜单的图标;
 */
import React from 'react'
import {
  AppstoreOutlined,
  FileWordOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
} from '@ant-design/icons'

interface MenuIconsType {
  [index: string]: React.ReactNode,
}

const MenuIcons: MenuIconsType = {
  docs: <FileWordOutlined />,
  products: <AppstoreOutlined />,
  productsList: <UnorderedListOutlined />,
  productsCategory: <OrderedListOutlined />,
}

export default MenuIcons

