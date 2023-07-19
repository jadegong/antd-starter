import styled from 'styled-components';
import { Collapse } from '../index';
import './index.less';

export const BasicCollapse = styled(Collapse)`
  .ant-collapse {
    background: ${(props) => props.theme['dark-blue5']};
    color: ${(props) => props.theme['dark-white']};
  }
`;
