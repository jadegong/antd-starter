import React from 'react'
import { Outlet, } from 'umi'

const BlankLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default BlankLayout
