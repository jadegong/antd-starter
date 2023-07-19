import React, { useState, useEffect, useCallback, } from 'react'
import { useNavigate } from 'umi'
import constants from '@/utils/constants'
import {
  sendSmsCode,
  mobileLogin,
} from '@/api/login'

import {
  Button,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
} from 'antd'

const MobileLoginForm: React.FC = () => {
  // constants
  const navigate = useNavigate()
  // states
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [sendSmsOnce, setSendSmsOnce] = useState(false) // 是否已经发送短信验证码
  const [haveSendSms, setHaveSendSms] = useState(false) // 是否已经发送短信验证码
  const [remainSeconds, setRemainSeconds] = useState(60) // 多少秒后可以点击发送验证码

  // Countdown timer
  let seconds = 60
  const minusSecond = () => {
    if (seconds <= 0) {
      setHaveSendSms(false)
      setRemainSeconds(60)
      seconds = 60
      return
    } else {
      seconds -= 1
      setRemainSeconds(seconds)
      setTimeout(() => {
        minusSecond()
      }, 1000)
    }
  }

  const handleSendSmsCode = () => {
    const mobile = form.getFieldValue('mobile')
    if (!constants.REGEXP.PHONE.test(mobile)) {
      message.warning('请输入正确的手机号！')
      return
    }
    setLoading(true)
    sendSmsCode({mobile,}).then((res: any) => {
      if (res.status === constants.REQUEST_STATUS.SUCCESS) {
        message.success('短信验证码发送成功！')
        setSendSmsOnce(true)
        setHaveSendSms(true)
        // DONE: 循环读秒
        minusSecond()
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const submitMobileForm = (values: any) => {
    if (!sendSmsOnce) {
      message.warning('请先获取验证码再提交！')
      return
    }
    mobileLogin({ ...values }).then((res: any) => {
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
    <Form
      form={form}
      name="mobileForm"
      onFinish={submitMobileForm}
      autoComplete="off"
    >
      <Form.Item
        label=""
        name="mobile"
        rules={[
          { required: true, message: '请输入手机号！', },
          { pattern: constants.REGEXP.PHONE, message: '请输入正确的手机号！', },
        ]}
      >
        <Input size="large" placeholder="用户名" style={{ borderRadius: '0' }}/>
      </Form.Item>
      <Form.Item
        label=""
      >
        <Row gutter={4}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: '请输入验证码！', }]}
            >
              <Input size="large" style={{ borderRadius: '0' }}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button size="large" type="primary" onClick={handleSendSmsCode} disabled={(remainSeconds > 0 && haveSendSms) || loading} block style={{ borderRadius: '0' }} loading={loading}>{(!haveSendSms || (haveSendSms && remainSeconds <= 0)) ? '发送验证码' : `${remainSeconds}s`}</Button>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit" style={{ borderRadius: '0' }} block disabled={!sendSmsOnce}>登录</Button>
      </Form.Item>
    </Form>
  )
}

export default MobileLoginForm
