import { Divider, Radio, Table } from 'antd'
import React, { useState } from 'react'

const TableComponent = (props) => {
    const {selectionType = 'checkbox', data = [], isLoading = false, columns = []} = props;

    // const columns = [
    //     {
    //       title: 'Name',
    //       dataIndex: 'name',
    //       render: (text) => <a>{text}</a>,
    //     },
    //     {
    //       title: 'Price',
    //       dataIndex: 'price',
    //     },
    //     {
    //       title: 'Rating',
    //       dataIndex: 'rating',
    //     },
    //     {
    //       title: 'Type',
    //       dataIndex: 'type',
    //     },
    //     {
    //       title: 'Action',
    //       dataIndex: 'action',
    //       render: (text) => <a>{text}</a>,
    //     },
    // ];
    
    // const data = products?.length && products?.map((product) =>{
    //   return{
    //     ...product,
    //     key: product._id,
    //   }
    // })

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows ) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          name: record.name,
        }),
    };
    return (
          <Table
              rowSelection={{ type: selectionType, ...rowSelection }}
              columns={columns}
              dataSource={data}
              {...props}
          />
    )
}

export default TableComponent