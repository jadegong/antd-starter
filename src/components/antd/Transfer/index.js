import styled from 'styled-components';
import { Transfer } from 'antd';

export const BasicTransfer = styled(Transfer)`
  .ant-transfer-list-content-item {
    color: ${(props) => props.theme['dark-white']};
  }

  .ant-transfer-list-content-item-checked,
  .ant-transfer-list-content-item:not(.ant-transfer-list-content-item-disabled):hover {
    color: rgba(0, 0, 0, 0.65);
  }
`;
