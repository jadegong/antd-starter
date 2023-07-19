/*
 * @Descripttion:
 * @version:
 * @Author:
 * @Date: 2020-09-01 10:57:18
 * @LastEditors: ljx
 * @LastEditTime: 2020-12-03 10:34:08
 */
import styled from 'styled-components';
import { Table } from '../index';

export const BasicTable = styled(Table)`
  .ant-table-thead > tr > th {
    color: ${(props) => props.theme['dark-white']};
    background: ${(props) => props.theme['dark-blue5']};
    border-bottom-color: ${(props) => props.theme['dark-blue2']};
    font-weight: bold;
  }
  .ant-table.ant-table-bordered thead > tr > th,
  .ant-table.ant-table-bordered tbody > tr > td,
  .ant-table.ant-table-bordered tfoot > tr > th,
  .ant-table.ant-table-bordered tfoot > tr > td {
    border-right: none;
  }
  .ant-table {
    background: ${(props) => props.theme['dark-blue5']};
    color: ${(props) => props.theme['dark-white']};
  }
  .ant-table.ant-table-bordered .ant-table-container {
    border: none;
  }
  .ant-table-tbody > tr.light-tr-row {
    background: ${(props) => props.theme['dark-blue5']};
  }
  .ant-table-tbody > tr.dark-tr-row {
    background: ${(props) => props.theme['dark-blue13']};
  }
  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background: ${(props) => props.theme['dark-blue5']};
  }
  .ant-table-tbody > tr > td {
    border-bottom-color: ${(props) => props.theme['dark-blue2']};
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: ${(props) => props.theme['dark-blue14']} !important;
  }
  .ant-pagination {
    color: ${(props) => props.theme['dark-blue4']};
  }
  .ant-pagination-item {
    background-color: ${(props) => props.theme['dark-blue5']};
    border-color: ${(props) => props.theme['dark-gray1']};
  }
  .ant-pagination-item a {
    color: ${(props) => props.theme['dark-blue4']};
  }
  .ant-pagination-item-active:focus a,
  .ant-pagination-item-active:hover a {
    color: ${(props) => props.theme['dark-blue11']};
  }
  .ant-pagination-item-active a {
    color: ${(props) => props.theme['dark-blue11']};
  }
  .ant-pagination-item:focus a,
  .ant-pagination-item:hover a {
    color: ${(props) => props.theme['dark-blue11']};
  }
  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-pagination-options-quick-jumper input {
    background-color: ${(props) => props.theme['dark-blue5']};
    border-color: ${(props) => props.theme['dark-gray1']};
    color: ${(props) => props.theme['dark-blue4']};
  }
  .ant-pagination-prev .ant-pagination-item-link:hover,
  .ant-pagination-next .ant-pagination-item-link:hover {
    color: ${(props) => props.theme['dark-blue11']};
  }
  .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis,
  .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: ${(props) => props.theme['dark-blue4']};
  }
  .ant-select-arrow {
    color: ${(props) => props.theme['dark-blue4']};
  }
  .ant-table.ant-table-bordered .ant-table-expanded-row-fixed::after {
    border-right-color: ${(props) => props.theme['dark-blue2']};
  }
  td.ant-table-column-sort {
    background: none;
  }
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${(props) => props.theme['dark-blue6']};
  }
  .ant-table-tbody > tr.ant-table-row-selected > td {
    background: ${(props) => props.theme['dark-blue6']};
  }
`;
