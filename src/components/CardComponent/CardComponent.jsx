import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperReportTxt, WrapperStyleTextSell } from './style';
import {StarFilled} from '@ant-design/icons'

import logo from '../../assets/images/logo.png';





const CardComponent = () => {
  return (
    <WrapperCardStyle
        hoverable
        headStyle = {{width: '200px', heigh: '200px'}}
        style={{ width: 200, marginTop: 20 }}
        bodyStyle={{padding: '10px'}}//padding phần Meta tag
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
        <WrapperImageStyle src = {logo} alt="logo" />
        <StyleNameProduct>Iphone</StyleNameProduct>
        <WrapperReportTxt style={{marginRight: '5px'}} >
            <span>
               <span>4.5</span><StarFilled style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}} />
            </span>
            <WrapperStyleTextSell> |  Sold 1000+</WrapperStyleTextSell>
        </WrapperReportTxt>
        <WrapperPriceText>
            <span style={{marginRight: '10px'}} >$55</span>
            <WrapperDiscountText>-20%</WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  )
}

export default CardComponent
