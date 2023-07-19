/** @format */
import React from 'react';
import { Cascader } from '../index';
import './index.less';
import { theme } from '@/theme';

export const BasicCascader = ({ children, width = '200px', ...rest }) => {
  return (
    <Cascader
      className="authorityCascader"
      popupClassName="authorityCascaderPopup"
      style={{
        width,
        backgroundColor: theme['dark-blue5'],
        transition: 'width .4s ease-in-out',
        bordered: false,
      }}
      {...rest}
    >
      {children}
    </Cascader>
  );
};
