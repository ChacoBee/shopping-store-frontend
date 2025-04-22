import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {  ProductOutlined, UserOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';

const AdminPage = () => {
  const items = [
    getItem('Users', 'user', <UserOutlined />),
    getItem('Products', 'product', <ProductOutlined />)
  ];
  

  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) =>{
    switch (key) {
      case 'user':
        return <AdminUser />;
      case 'product':
        return <AdminProduct />;
      default:
        return null;
    }
  }

  const handleOnClickMenuItem = ({key}) =>{
    setKeySelected(key);
  }
  console.log('keySelected', keySelected);
  return (
    <>
      <Header isHiddenSearch isHiddenCart/>
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          style={{ 
            width: 256,
            boxShadow: '0 2px 8px rgba(0, 21, 41, 0.2)',
            height: '100vh',
          }}
          items={items}
          onClick={handleOnClickMenuItem}
        />
        <div style={{
            flex: 1,
            padding: '20px',
          }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage
