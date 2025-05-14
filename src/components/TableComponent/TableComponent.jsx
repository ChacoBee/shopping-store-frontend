import { Divider, Radio, Table } from 'antd'
import React, { useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


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

    // Hàm export excel dùng xlsx
    const exportToExcel = () => {
      // Lọc bỏ các column không muốn export (ví dụ: dataIndex === 'action')
      const exportColumns = columns.filter(col => col.dataIndex !== 'action');
        
      // Chuyển data thành mảng object đơn giản
      const exportData = data.map(row => {
        const obj = {};
        exportColumns.forEach(col => {
          obj[col.title] = row[col.dataIndex];
        });
        return obj;
      });

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(dataBlob, "table.xlsx");
    };

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
        <button onClick={exportToExcel} style={{marginBottom: 10}}>Export Excel</button>

          <Table
              id = "table-xls"
              rowSelection={{ type: selectionType, ...rowSelection }}
              columns={columns}
              dataSource={data}
              {...props}
          />
      </>
    )
}

export default TableComponent