import React, { useState, } from 'react'
import { useNavigate, } from 'umi'
import constants from '@/utils/constants'
import {
  passwordLogin,
} from '@/api/login'

import {
  Button,
  Form,
  Input,
  notification,
} from 'antd'

const AccountLoginForm: React.FC = () => {
  // constants
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const submitAccountForm = (values: any) => {
    // TODO: 临时登录
    passwordLogin(values).then((res: any) => {
      if (res.status === constants.REQUEST_STATUS.SUCCESS) {
        // DONE: Jump
        notification.success({
          message: '成功',
          description: '登录成功，即将跳转！',
        })
        sessionStorage.setItem(constants.MUTATION_TYPES.USER_INFO_SESSION_STORAGE, res.data)
        sessionStorage.setItem(constants.MUTATION_TYPES.ACCESS_TOKEN, res.data.token)
        navigate('/docs')
      }
    })
  }

  return (
    <>
      <Form
        form={form}
        name="accountForm"
        onFinish={submitAccountForm}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input size="large" placeholder="用户名" style={{borderRadius: '0'}} />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password size="large" placeholder="密码" style={{ borderRadius: '0' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit" block style={{ borderRadius: '0' }}>登录</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AccountLoginForm
