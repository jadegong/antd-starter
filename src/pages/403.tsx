import React from 'react'
import { useNavigate } from 'umi'
import type { To } from 'history'

import {
  Button,
  Result,
} from 'antd'

const Exception403Page: React.FC = () => {
  const navigate = useNavigate()

  const handleGotoPage = (path: To) => {
    navigate(path)
  }

  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="对不起，您无权访问该页面。"
        extra={<Button type="primary" onClick={() => { handleGotoPage('/docs') }}>返回首页</Button>}
      />
    </div>
  )
}

export default Exception403Page
