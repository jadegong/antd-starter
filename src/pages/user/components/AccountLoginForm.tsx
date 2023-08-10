/**
 * v0.0.1 2023/08/10 gqd 增加滑动验证码;
 */
import React, { useState, } from 'react'
import { useNavigate, } from 'umi'
import constants from '@/utils/constants'
import {
  getSliderImg,
  passwordLogin,
} from '@/api/login'

import {
  Button,
  Form,
  Input,
  notification,
} from 'antd'
import SliderCheckImageBox from '@/components/SliderCheckImageBox'

import defaultBackImg from '@/assets/sliderCheckImage/sample_after.png'
import defaultMaskImg from '@/assets/sliderCheckImage/sample_after_mark.png'

const AccountLoginForm: React.FC = () => {
  // constants
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // state
  const [requestParams, setRequestParams] = useState({})
  const [uniqueNum, setUniqueNum] = useState(0)
  const [checkImageBoxVisible, setCheckImageBoxVisible] = useState(false)
  const [checkImageInfo, setCheckImageInfo] = useState({initData: true, ylocation: 50, maskImg: defaultMaskImg, backImg: defaultBackImg,})

  const getCaptchaImg= () => {
    getSliderImg({}).then((res: any) => {
      if (res.status === constants.REQUEST_STATUS.SUCCESS) {
        setCheckImageInfo({
          initData: false,
          ylocation: res.data.ylocation,
          maskImg: `data:image/png;base64,${res.data.maskImg}`,
          backImg: `data:image/png;base64,${res.data.backImg}`,
          // maskImg: res.data.maskImg,
          // backImg: res.data.backImg,
        })
        setUniqueNum(res.data.uniqueNum)
      }
    })
  }

  const submitAccountForm = (values: any) => {
    // DONE: 调用滑动验证码
    getCaptchaImg()
    setCheckImageBoxVisible(true)
    setRequestParams(values)
  }

  const sendDataAjaxFn = (xlocation: number) => {
    return new Promise((resolve, reject) => {
      passwordLogin({ ...requestParams, xlocation, uniqueNum, }).then((res: any) => {
        resolve(res)
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  const successCallback = (res: any) => {
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
  }
  const errorCallback = (res: any) => {}

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
      {checkImageBoxVisible ? (
        <SliderCheckImageBox
          checkImageInfo={checkImageInfo}
          checkImageBoxVisible={checkImageBoxVisible}
          setCheckImageBoxVisible={setCheckImageBoxVisible}
          sendDataAjaxFn={sendDataAjaxFn}
          refreshCallback={() => {getCaptchaImg()}}
          successCallback={successCallback}
          errorCallback={errorCallback}
        />
      ) : null}
    </>
  )
}

export default AccountLoginForm
