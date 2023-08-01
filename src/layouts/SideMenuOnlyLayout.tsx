/**
 * 只有侧边菜单的布局;
 * v0.0.1 2023/07/20 gqd new file;
 *        2023/08/01 gqd 路由变化的逻辑处理;
 */
import React, { useEffect, useState, useCallback, } from 'react'
import { Outlet, useLocation, useNavigate, useSelectedRoutes, } from 'umi';
import settings from '@/defaultSettings'
import MenuIcons from '../../config/router.config'

import {
  Breadcrumb,
  Layout,
  Menu,
} from 'antd'

import './index.less';

const { Content, Sider, } = Layout

const SideMenuOnlyLayout: React.FC = () => {
  // states
  const [collapsed, setCollapsed] = useState(false)
  const [siderMenus, setSiderMenus] = useState(Array<any>())
  const [selectedSiderKeys, setSelectedSiderKeys] = useState(Array<any>())
  const [openedSiderKeys, setOpenedSiderKeys] = useState(Array<any>())
  const [breadcrumbItems, setBreadcrumbItems] = useState(Array<any>())

  const locationObj = useLocation()
  const navigateObj = useNavigate()
  const selectedRoutes = useSelectedRoutes()

  // functions
  // 菜单切换
  const handleSiderMenuClick = useCallback((e: any) => {
    setSelectedSiderKeys([e.key])
    // DONE: 路由跳转
    navigateObj(e.item.props.path)
  }, [siderMenus])

  // 处理openedKeys
  const handleSiderMenuRoutes = (arr: Array<any>, path: String): Array<any> => {
    let temp = Array<any>()
    for (let i = 0; i < arr.length; i++) {
      if (path.indexOf(arr[i].path) >= 0) {
        temp.push(arr[i])
        if (arr[i].children && arr[i].children.length > 0) {
          temp = temp.concat(handleSiderMenuRoutes(arr[i].children, path))
        }
      }
    }
    return temp
  }

  const handleSiderMenus = (arr: Array<any>, parentPath: string): Array<any> => {
    let temp = Array<any>()
    arr.forEach((item: any) => {
      if (item.path !== parentPath) { // 剔除redirect的路由配置
        let child = item.chldren ? handleSiderMenus(item.children, item.path) : Array<any>()
        if (child.length > 0) {
          temp.push({
            key: item.key,
            label: item.label,
            path: item.path,
            icon: MenuIcons[item.key],
            children: child,
          })
        } else {
          temp.push({
            key: item.key,
            label: item.label,
            path: item.path,
            icon: MenuIcons[item.key],
          })
        }
      }
    })
    return temp
  }

  useEffect(() => {
    if (selectedRoutes[2]) {
      let routes = selectedRoutes[2]?.route?.children || []
      let temp = handleSiderMenus(routes, selectedRoutes[2]?.pathname)
      setSiderMenus(temp)
    }
  }, [])

  // 设置选中的侧边菜单
  useEffect(() => {
    let temp = handleSiderMenuRoutes(siderMenus, locationObj.pathname)
    setOpenedSiderKeys(temp.slice(0, -1).map((v: any) => v.key))
    setSelectedSiderKeys([temp.at(-1)?.key])
    let breadItems = Array<any>()
    breadItems.push({ href: `${settings.packageName}${selectedRoutes[2]?.pathname}`, title: selectedRoutes[2]?.route?.label})
    for (let i = 0; i < temp.length; i++) {
      if (i !== temp.length - 1) {
        breadItems.push({ href: `${settings.packageName}${temp[i].path}`, title: temp[i].label, })
      } else {
        breadItems.push({ title: temp[i].label, })
      }
    }
    setBreadcrumbItems(breadItems)
  }, [locationObj, siderMenus])

  return (
    <div className="sider-menu-layout-container">
      <Layout style={{ minHeight: '100%' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value: boolean) => setCollapsed(value)}
          theme={settings.theme}
        >
          <Menu
            selectedKeys={selectedSiderKeys}
            openKeys={openedSiderKeys}
            theme={settings.theme}
            mode="inline"
            onClick={handleSiderMenuClick}
            items={siderMenus}
          >
          </Menu>
        </Sider>
        <Layout style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
          <Breadcrumb
            items={breadcrumbItems}
            style={{ margin: '0 0 12px 12px' }}
          >
          </Breadcrumb>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default SideMenuOnlyLayout
