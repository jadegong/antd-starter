import styled from 'styled-components';
import { Input } from '../index';

export const BasicInput = styled(Input)`
  &.ant-input,
  .ant-input {
    color: ${(props) => props.theme['dark-white']};
    border: solid 1px ${(props) => props.theme['dark-gray1']};
    border-radius: 1px;
    font-size: 12px;
    background-color: ${(props) => props.theme['dark-blue5']};
  }
`;
BasicInput.TextArea = styled(Input.TextArea)`
  &.ant-input,
  .ant-input {
    color: ${(props) => props.theme['dark-white']};
    border: solid 1px ${(props) => props.theme['dark-gray1']};
    border-radius: 1px;
    font-size: 12px;
    background-color: ${(props) => props.theme['dark-blue5']};
  }
`;
export const CustomTextArea = BasicInput.TextArea;
