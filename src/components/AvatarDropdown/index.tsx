import React from 'react'
import type { MenuProps } from 'antd'
// components
import {
  Avatar,
  Dropdown,
  Space,
} from 'antd'
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import userAvatar from '@/assets/user_avatar.jpg'

import styles from './index.less'

const items: MenuProps['items'] = [
  {
    key: 'personalInfo',
    label: <Space><UserOutlined />个人中心</Space>,
  },
  {
    key: 'logout',
    label: <Space><LogoutOutlined />注销登录</Space>,
  },
]

const handleMenuClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
  // TODO: Navigate
}

const menuProps = {
  items,
  onClick: handleMenuClick,
}

const AvatarDropdown: React.FC = () => {
  return (
    <div className={styles.avatarDropdownContainer}>
      <Dropdown menu={menuProps}>
        <Space>
          <Avatar size={40} src={<img src={userAvatar} alt="用户" />} />
          Admin
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  )
}

export default AvatarDropdown
