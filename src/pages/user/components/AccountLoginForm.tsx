import React, { useState, } from 'react'
import constants from '@/utils/constants'
import {
  passwordLogin,
} from '@/api/login'

import {
  Button,
  Form,
  Input,
} from 'antd'

const AccountLoginForm: React.FC = () => {
  const [form] = Form.useForm()
  const submitAccountForm = (values: any) => {
    console.log(values)
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
