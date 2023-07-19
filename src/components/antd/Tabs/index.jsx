/** @format */
import styled from 'styled-components';
import { Tabs } from '../index';

const BasicTabs = styled(Tabs)`
  & .ant-tabs-bar {
    border-bottom: 1px solid ${(props) => props.theme['dark-blue6']};
  }
  & .ant-tabs-ink-bar {
    height: 3px;
    background: ${(props) => props.theme['dark-blue11']};
  }

  & .ant-tabs-nav .ant-tabs-tab {
    padding: 10px 0;
  }

  & .ant-tabs-nav .ant-tabs-tab-active {
    color: ${(props) => props.theme['dark-blue11']};
  }
  & .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-disabled {
    color: ${(props) => props.theme['dark-white']};
  }
`;
BasicTabs.TabPane = Tabs.TabPane;

export { BasicTabs };
