import React, { useState, } from 'react'
import settings from '@/defaultSettings'
import {
  Tabs,
} from 'antd'
import type { TabsProps } from 'antd'
import AccountLoginForm from './components/AccountLoginForm'
import MobileLoginForm from './components/MobileLoginForm'

import styles from './login.less'

const tabItems: TabsProps['items'] = [
  {
    key: 'account',
    label: '账号密码登录',
  },
  {
    key: 'mobile',
    label: '手机号登录',
  },
]

const LoginPage: React.FC = () => {
  const [currentTabKey, setCurrentTabKey] = useState('account')

  const handleTabChange = (key: string) => {
    setCurrentTabKey(key)
  }

  return (
    <div className={styles.loginContainer}>
      <h1>{ settings.title }</h1>
      <div className={styles.loginBlock}>
        <Tabs activeKey={currentTabKey} items={tabItems} onChange={handleTabChange}/>
        {currentTabKey === 'account' ? (
          <AccountLoginForm />
        ) : (
          <MobileLoginForm />
        )}
      </div>
    </div>
  )
}

export default LoginPage
