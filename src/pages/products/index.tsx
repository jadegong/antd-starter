import React, { useEffect, useState } from 'react';
import constants from '@/utils/constants'

import {
  productsList,
} from '@/api/products'

// components
import StandardTable from '@/components/StandardTable';

import styles from './index.less';

export default function ProductsPage() {
  // state
  const [tableListData, setTableListData] = useState({ Rows: Array<any>(), total: 0})
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    pageIndex: 1,
    pageSize: 10,
    // sortName: 'createDate',
    // sortOrder: 'desc',
  });

  //分页操作
  const handleStandardTableChange = (pagination: { current: any; pageSize: any; }, sorter: { field: any; order: any; }) => {
    // page.pageIndex = pagination.current;
    // page.pageSize = pagination.pageSize;
    // if (sorter.field) {
    // page.sortName = sorter.field;
    // page.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
    // }
    setPage({ pageIndex: pagination.current, pageSize: pagination.pageSize });
  };

  // 查询列表数据
  useEffect(() => {
    let params = {
      page: page.pageIndex - 1,
      size: page.pageSize,
    }
    setLoading(true)
    productsList(params).then((res: any) => {
      if (res.status === constants.REQUEST_STATUS.SUCCESS) {
        setTableListData({ Rows: res.data, total: res.total });
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [page])

  // 表格列
  const columns = [
    {
      title: '序号',
      width: 50,
      dataIndex: '',
      render: (val: string, record: any, index: number) => {
        return index + 1;
      }
    },
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
  ]

  return (
    <div>
      <h1 className={styles.title}>Page products</h1>
      <div>
        <StandardTable
          rowKey={(record: { id: any }) => record.id}
          loading={loading}
          data={{
            list: tableListData.Rows,
            pagination: {
              total: tableListData.total,
              pageSize: page.pageSize,
              current: page.pageIndex,
            },
          }}
          columns={columns}
          onChange={handleStandardTableChange}
        />
      </div>
    </div>
  );
}
