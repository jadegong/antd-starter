/*
 * @Descripttion:
 * @version:
 * @Author: ljx
 * @Date: 2021-01-21 15:48:53
 * @LastEditors: ljx
 * @LastEditTime: 2021-03-03 15:32:44
 */
import styled from 'styled-components';
import { Modal } from '../index';

const BasicModal = styled(Modal)`
  .ant-modal-content {
    color: red;
    background: ${(props) => props.theme['dark-blue10']};
  }
  .ant-modal-body {
    color: ${(props) => props.theme['dark-white']};
    background: ${(props) => props.theme['dark-blue10']};
  }
  .ant-modal-close {
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-modal-header {
    background: ${(props) => props.theme['dark-blue10']};
    border-bottom-color: ${(props) => props.theme['dark-blue1']};
  }
  .ant-modal-title {
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-modal-footer {
    border-top-color: ${(props) => props.theme['dark-blue1']};
  }
  .ant-modal-confirm-body {
    .ant-modal-confirm-title,
    .ant-modal-confirm-content {
      color: ${(props) => props.theme['dark-white']};
    }
  }
`;

BasicModal.info = Modal.info;
BasicModal.success = Modal.success;
BasicModal.error = Modal.error;
BasicModal.warning = Modal.warning;
BasicModal.confirm = Modal.confirm;

export { BasicModal };
