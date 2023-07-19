import React from 'react'
import { useNavigate } from 'umi'
import { logout } from '@/api/login'
import constants from '@/utils/constants'

// components
import {
  Avatar,
  Dropdown,
  message,
  Modal,
  Space,
} from 'antd'
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import userAvatar from '@/assets/user_avatar.jpg'

import styles from './index.less'

const navigate = useNavigate()

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
  // DONE: Navigate
  if (e.key === 'personalInfo') {
    navigate('/sys/personalCenter/info')
  } else if (e.key === 'logout') {
    // TODO: Logout
    Modal.confirm({
      title: '警告',
      content: '确定要注销登录吗？',
      onOk() {
        logout({}).then((res: any) => {
          if (res.status === constants.REQUEST_STATUS.SUCCESS) {
            message.success('注销成功！')
          }
        }).finally(() => {
          sessionStorage.removeItem(constants.MUTATION_TYPES.ACCESS_TOKEN)
          sessionStorage.removeItem(constants.MUTATION_TYPES.USER_INFO_SESSION_STORAGE)
          navigate('/user/login')
        })
      },
    })
  }
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
