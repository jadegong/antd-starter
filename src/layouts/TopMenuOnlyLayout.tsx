import React, { useEffect, useState, } from 'react'
import { Outlet, useAppData, useLocation, useNavigate, } from 'umi';
import settings from '@/defaultSettings'

import {
  Menu,
} from 'antd'
import AvatarDropdown from '@/components/AvatarDropdown'

import logoPng from '@/assets/yay.jpg'

import './index.less';

const TopMenuOnlyLayout: React.FC = () => {
  // states
  const [selectedTopKeys, setSelectedTopKeys] = useState(Array<any>())
  const [topMenus, setTopMenus] = useState(Array<any>())

  const appData = useAppData()
  const locationObj = useLocation()
  const navigateObj = useNavigate()

  // functions
  // 菜单切换
  const handleTopMenuClick = (e: any) => {
    setSelectedTopKeys([e.key])
    // DONE: 路由跳转
    navigateObj(`/${e.keyPath}`)
  }

  useEffect(() => {
    if (appData.clientRoutes) {
      let routes = appData?.clientRoutes[0]?.children || []
      let temp = routes.map((item: any) => ({
        key: item.key,
        label: item.label,
        path: item.path,
      }))
      setTopMenus(temp)
    }
  }, [])

  // 设置选中的顶级菜单
  useEffect(() => {
    if (topMenus.length <= 0) return
    let temp = Array<any>()
    topMenus.forEach((item: any) => {
      if (locationObj.pathname === item.path) {
        temp.push(item.key)
      }
    })
    setSelectedTopKeys(temp)
  }, [topMenus])

  return (
    <div className="top-menu-layout-container">
      <div className="self-topbar">
        <div className="self-topbar-left">
          <div className="self-topbar-logo">
            <img src={logoPng} alt={settings.title} />
            <h1>{settings.title}</h1>
          </div>
        </div>
        <Menu
          selectedKeys={selectedTopKeys}
          theme={settings.theme}
          mode='horizontal'
          onClick={handleTopMenuClick}
          style={{ lineHeight: '60px', marginLeft: '24px' }}
          items={topMenus}
        >
        </Menu>
        <AvatarDropdown />
      </div>
      <Outlet />
    </div>
  );
}
export default TopMenuOnlyLayout
