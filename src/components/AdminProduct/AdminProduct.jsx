import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'

const AdminProduct = () => {
  return (
    <div>   
        <WrapperHeader>Manage Products</WrapperHeader>
        <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '15px',
                marginBottom: '15px',
            }}>
            <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '10px',
                    borderStyle: 'dashed',
                }}><PlusOutlined style={{
                        fontSize: '40px',
                        color: '#000',
                    }}/>
            </Button>
        </div>
        <div style={{
            marginTop: '20px',
        }}>
            <TableComponent />
        </div>
    </div>
  )
}

export default AdminProduct