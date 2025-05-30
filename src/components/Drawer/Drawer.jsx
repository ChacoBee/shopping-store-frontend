import React from 'react'
import { Drawer } from 'antd';

const Drawer = ({title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
  return (
    <>
      <Drawer title= {title} placement = {placement} open={isOpen} {...rests}>
        {children}
      </Drawer>
    </>
  )
}

export default Drawer