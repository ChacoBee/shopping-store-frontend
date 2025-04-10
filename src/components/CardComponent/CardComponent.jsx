import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportTxt, WrapperStyleTextSell } from './style';
import {StarFilled} from '@ant-design/icons'

import logo from '../../assets/images/logo.png';


const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, discount, sold} = props
  return (
    <WrapperCardStyle
        hoverable
        headStyle = {{width: '200px', heigh: '200px'}}
        style={{ width: 200, marginTop: 20 }}
        bodyStyle={{padding: '10px'}}//padding phần Meta tag
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <WrapperImageStyle src = {logo} alt="logo" />
        <StyleNameProduct>{name}</StyleNameProduct>
        <WrapperReportTxt style={{marginRight: '5px'}} >
            <span>
               <span>{rating}</span><StarFilled style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}} />
            </span>
            <WrapperStyleTextSell> |  Sold {sold || 1000}</WrapperStyleTextSell>
        </WrapperReportTxt>
        <WrapperPriceText>
            <span style={{marginRight: '10px'}} >{price}</span>
            <WrapperDiscountText>{discount || 5}%</WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
