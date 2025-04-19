import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import {  ProductOutlined, UserOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';

const AdminPage = () => {
  const items = [
    getItem('Users', 'sub1', <UserOutlined />, [
      getItem('Option 1', '1'),
      getItem('Option 2', '2'),
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
    ]),
    getItem('Products', 'sub2', <ProductOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
  ];
  
  const rootSubmenuKeys = ['users', 'products'];
  const [openKeys, setOpenKeys] = useState(['users']);
  const [keySelected, setKeySelected] = useState('');

  const onOpenChange = (key) => {
    const lastestOpenKey = key.find((key) => openKeys.indexOf(key) === -1);
    if(rootSubmenuKeys.indexOf(lastestOpenKey) === -1) {
      setOpenKeys(key);
    }else{
      setOpenKeys(lastestOpenKey ? [lastestOpenKey] : []);
    }
  };
  const handleOnClickMenuItem = ({key}) =>{
    setKeySelected(key);
  }
  return (
    <>
      <Header isHiddenSearch isHiddenCart/>
      <div style={{ display: 'flex' }}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 256 }}
          items={items}
          onClick={handleOnClickMenuItem}
        />
        <div style={{flex: 1}}>
          {keySelected === '6' && <span>Key is 6</span>}
          <span>test</span>
        </div>
      </div>
    </>
  )
}

export default AdminPage
