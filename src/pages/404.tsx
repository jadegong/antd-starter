import React from 'react'
import { useNavigate } from 'umi'
import type { To } from 'history'

import {
  Button,
  Result,
} from 'antd'

const Exception404Page: React.FC = () => {
  const navigate = useNavigate()

  const handleGotoPage = (path: To) => {
    navigate(path)
  }

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="对不起，您访问的页面不存在。"
        extra={<Button type="primary" onClick={() => { handleGotoPage('/docs') }}>返回首页</Button>}
      />
    </div>
  )
}

export default Exception404Page
