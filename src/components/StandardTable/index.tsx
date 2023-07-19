/**
 * 表格组件;
 * Props:
 *   data: Object<{list: Array<any>, pagination: Object}>;
 *   rowKey: String | Function, default: 'key';
 *   selectedRows: Array<any>;
 *   onChange: (pagination: PaginationProps, filters: any, sorter: any) => void;
 *   onSelectRow: (selectedRows: Array<any>) => void;
 *   ...
 * v0.0.1 2023/07/17 gqd New File;
 */
import React, { useState, useRef } from 'react';
import { BasicTable } from '@/components/antd';
import styles from './index.less';

const StandardTable: React.FC<any> = (props: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(Array<any>());
  const rowSelectionRef = useRef([]);

  function handleRowSelectChange(selectedRowKeys: Array<any>, selectedRows: Array<any>) {
    const { onSelectRow } = props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    setSelectedRowKeys(selectedRowKeys);
  }

  function setRowClassName(record: any, index: number) {
    let className = 'dark-tr-row';
    if (index % 2 === 1) className = 'light-tr-row';
    return className;
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    const { onChange } = props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  }

  // function cleanSelectedKeys() {
  //   handleRowSelectChange([], []);
  // }

  const { data = {}, rowKey, ...rest } = props;
  const { list = [], pagination } = data;

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: [10, 20, 50],
    ...pagination,
  };

  rowSelectionRef.current = props.selectedRows
    ? {
        selectedRowKeys,
        selections: false,
        onChange: handleRowSelectChange,
        getCheckboxProps: (record) => ({
          disabled: record.disabled,
        }),
      }
    : false;
  if (rowSelectionRef.current) {
    return (
      <div className={`${styles.standardTable} ${props.extraClassName || ''}`}>
        <BasicTable
          rowKey={rowKey || 'key'}
          rowSelection={rowSelectionRef.current}
          dataSource={list}
          rowClassName={setRowClassName}
          pagination={pagination ? paginationProps : null}
          onChange={handleTableChange}
          {...rest}
        />
      </div>
    );
  }
  return (
    <div className={`${styles.standardTable} ${props.extraClassName || ''}`}>
      <BasicTable
        rowKey={rowKey || 'key'}
        dataSource={list}
        rowClassName={setRowClassName}
        pagination={pagination ? paginationProps : null}
        onChange={handleTableChange}
        {...rest}
      />
    </div>
  );
};

export default StandardTable;
