import React from 'react';
import { Popover } from '../index';
import './style.less';

const BasicPopover = ({ children, ...rest }) => {
  return (
    <Popover overlayClassName="basic-popover" {...rest}>
      {children}
    </Popover>
  );
};

export { BasicPopover };
