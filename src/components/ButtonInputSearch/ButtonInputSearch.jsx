import { Button } from 'antd'
import React from 'react'
import {
    SearchOutlined,
  } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {

    const {
        size, 
        placeholder, 
        textButton, 
        variant,
        backgroundColorInput ='#fff', 
        backgroundColorButton ='rgb(93, 93, 93)',
        colorButton = '#fff'
    } = props 

    return (
        <div style={{
                display: 'flex'
             }}> 
            <InputComponent
                size = {size} 
                placeholder = {placeholder} 
                variant={variant} 
                style={{
                    backgroundColor: backgroundColorInput,
                    borderRadius: "0px"
                }} 
                {...props}
            />
            <ButtonComponent 
                size={size} 
                type="text" 
                styleButton={{
                    backgroundColor: backgroundColorButton,
                    borderRadius: "0px"
                }} 
                icon = {<SearchOutlined style={{color: '#fff'}}/>}
                textButton = {textButton}
                styleTextButton = {{color: colorButton}}
            />    
        </div>
    )
}

export default ButtonInputSearch
