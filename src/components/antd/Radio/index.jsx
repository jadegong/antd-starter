import styled from 'styled-components';
import { Radio } from '../index';

const BasicRadio = styled(Radio)`
  .ant-radio-inner {
    background-color: transparent;
    border-color: ${(props) => props.theme['dark-gray1']};
  }

  & > span:last-child {
    color: ${(props) => props.theme['dark-white']};
  }
`;

BasicRadio.Group = Radio.Group;
BasicRadio.Button = styled(Radio.Button)`
  &.ant-radio-button-wrapper {
    background: ${(props) => props.theme['dark-blue10']};
  }
`;

export { BasicRadio };
