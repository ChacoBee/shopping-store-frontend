import { Divider, Radio, Table } from 'antd'
import React, { useState } from 'react'

const TableComponent = (props) => {
    const {selectionType = 'checkbox', data = [], isLoading = false, columns = [], handleDeleteMany} = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([])

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
          setRowSelectedKey(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`,);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKey)
    }
    return (
      <>
        {rowSelectedKey.length > 0 && (
          <div style={{
            background: '#1d1ddd',
            color: '#fff',
            padding: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick = {handleDeleteAll}
          >
            Delete ALl
          </div>
        )}
          <Table
              rowSelection={{ type: selectionType, ...rowSelection }}
              columns={columns}
              dataSource={data}
              {...props}
          />
      </>
    )
}

export default TableComponent