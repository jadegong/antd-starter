import styled from 'styled-components';
import { Card } from '../index';

export const BasicCard = styled(Card)`
  .ant-card-body {
    background: ${(props) => props.theme['dark-blue5']};
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-card-head {
    background: ${(props) => props.theme['dark-blue5']};
    color: ${(props) => props.theme['dark-white']};
  }
`;
export const CustomCard = styled(Card)`
  .ant-card-body {
    background: ${(props) => props.theme['dark-blue10']};
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-card-actions {
    background: ${(props) => props.theme['dark-blue10']};
    border-top: 1px solid ${(props) => props.theme['dark-blue6']};
  }
  .ant-card-actions > li > span a:not(.ant-btn),
  .ant-card-actions > li > span > .anticon {
    color: ${(props) => props.theme['dark-blue4']};
  }
  .ant-card-meta-description {
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-card-actions > li:not(:last-child) {
    border-right: 1px solid ${(props) => props.theme['dark-blue6']};
  }
`;
