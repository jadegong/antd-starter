/**
 * 只有顶部菜单的布局;
 * v0.0.1 2023/07/18 gqd new file;
 *        2023/08/01 gqd 路由变化后的逻辑处理;
 */
import React, { useEffect, useState, } from 'react'
import { Outlet, useLocation, useNavigate, useSelectedRoutes, } from 'umi';
import settings from '@/defaultSettings'
import MenuIcons from '../../config/router.config'

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

  const locationObj = useLocation()
  const navigateObj = useNavigate()

  const selectedRoutes = useSelectedRoutes()

  // functions
  // 菜单切换
  const handleTopMenuClick = (e: any) => {
    setSelectedTopKeys([e.key])
    // DONE: 路由跳转
    navigateObj(e.item.props.path)
  }

  useEffect(() => {
    if (selectedRoutes[1]) {
      let routes = selectedRoutes[1]?.route?.children || []
      let temp = Array<any>()
      routes.forEach((item: any) => {
        if (item.path !== selectedRoutes[1].pathname) { // 剔除redirect的路由配置
          temp.push({
            key: item.key,
            label: item.label,
            path: item.path,
            icon: MenuIcons[item.key],
          })
        }
      })
      setTopMenus(temp)
    }
  }, [])

  // 设置选中的顶级菜单
  useEffect(() => {
    if (topMenus.length <= 0) return
    let temp = Array<any>()
    topMenus.forEach((item: any) => {
      if (locationObj.pathname.indexOf(item.path) >= 0) {
        temp.push(item.key)
      }
    })
    setSelectedTopKeys(temp)
  }, [topMenus, locationObj])

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
