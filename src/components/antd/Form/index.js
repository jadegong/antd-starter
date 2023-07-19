/*
 * @Descripttion:
 * @version:
 * @Author: ljx
 * @Date: 2020-12-23 15:39:23
 * @LastEditors: ljx
 * @LastEditTime: 2021-03-03 15:31:53
 */
/** @format */

import styled from 'styled-components';
import { Form } from '../index';

const BasicForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }
  label {
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-form-item-label > label {
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-input-affix-wrapper {
    background-color: ${(props) => props.theme['dark-blue5']};
    background-image: none;
    border: 1px solid ${(props) => props.theme['dark-gray1']};
  }
  .ant-input-affix-wrapper:hover {
    border-color: ${(props) => props.theme['dark-blue11']};
  }
  .ant-form-item-has-error .ant-input,
  .ant-form-item-has-error .ant-input-affix-wrapper,
  .ant-form-item-has-error .ant-input:hover,
  .ant-form-item-has-error .ant-input-affix-wrapper:hover {
    background-color: ${(props) => props.theme['dark-blue5']};
  }

  .ant-input-clear-icon {
    color: ${(props) => props.theme['dark-blue4']};
    background-color: transparent;
  }
  .ant-form-item-with-help {
    margin-bottom: 0;
  }
`;

BasicForm.useForm = Form.useForm;

export { BasicForm };
