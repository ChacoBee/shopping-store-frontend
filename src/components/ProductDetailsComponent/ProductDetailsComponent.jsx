import { Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import ImageProduct from '../../assets/images/tv.webp'
import ImageProductSmall from '../../assets/images/tv1.webp'
import ImageProductSmall2 from '../../assets/images/tv2.webp'
import ImageProductSmall3 from '../../assets/images/tv3.webp'
import ImageProductSmall4 from '../../assets/images/tv4.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperProductQuality, WrapperStyleColImage, WrapperStyleImage, WrapperStyleNameProduct, WrapperStyleTextSell } from './style'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ProductDetailsComponent = () => {

  const onChange = () =>{

  }

  return (
    <Row style={{padding: '16px', background: '#fff', borderRadius: '4px'}} >
      <Col span={10} style={{borderRight: '1px solid black', paddingRight: '10px'}}>
        <Image src = {ImageProduct} alt="image product" preview = {false} />
        <Row style={{paddingTop: '10px', justifyContent: 'space-between'}} >
            <WrapperStyleColImage span={4}>
                <WrapperStyleImage src = {ImageProductSmall} alt='image small' preview = {false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImage src = {ImageProductSmall2} alt='image small 2' preview = {false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImage src = {ImageProductSmall3} alt='image small 3' preview = {false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImage src = {ImageProductSmall4} alt='image small 4' preview = {false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImage src = {ImageProductSmall} alt='image small 5' preview = {false} />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
                <WrapperStyleImage src = {ImageProductSmall2} alt='image small 6' preview = {false} />
            </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{paddingLeft: '10px'}}>
        <WrapperStyleNameProduct>
          Android SMART TV Coocaa 32 inch - Model 32S7G Android 11.0 (Model 2020) 
        </WrapperStyleNameProduct>
        <div style={{marginLeft: '10px'}}>
          <StarFilled  style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}}/>
          <StarFilled  style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}}/>
          <StarFilled  style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}}/>
          <StarFilled  style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}}/>
          <StarFilled  style={{color: 'rgb(239, 214, 19)', fontSize: '12px'}}/>
          <WrapperStyleTextSell> |  Sold 1000+</WrapperStyleTextSell>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>$100</WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <WrapperAddressProduct>
          <span>Delivery to </span>
          <span className = 'address'>12 Worthington Ct, Sterling, Virginia, 20165</span>
          <span className='change-address'> - Change Address</span>
        </WrapperAddressProduct>
        <div style={{margin: '10px 0 20px',padding: '10px 0', borderTop: '1px solid nlack', borderBottom: ' 1px solid black'}} >
          <div style={{marginLeft:'10px', marginBottom: '10px'}}>Quality</div>
          <WrapperProductQuality> 
            <button style={{border: 'none', background: 'transparent'}}>
              <MinusOutlined style={{color: '#000', fontSize: '15px'}}/>                   
            </button>
              <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />         
            <button style={{border: 'none', background: 'transparent'}}>
              <PlusOutlined style={{color: '#000', fontSize: '15px'}}/>       
            </button>    
          </WrapperProductQuality>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginLeft:'10px'}}>
          <ButtonComponent 
            // bordered= {false}
            size={40} 
            styleButton={{
              background: 'rgb(255, 27, 69)',
              height: '48px',
              width: '220px',
              border: 'none',
              borderRadius: '4px'
            }} 
            textButton = {'Click to Buy'}
            styleTextButton = {{color: '#fff', fontSize: '15px', fontWeight: '700'}}          
          />
          <ButtonComponent 
            // bordered= {false}
            size={40} 
            styleButton={{
              background: 'rgb(255, 255, 255)',
              height: '48px',
              width: '220px',
              border: '1px solid black',
              borderRadius: '4px'
            }} 
            textButton = {'Pay Later'}
            styleTextButton = {{color: 'rgb(13, 92,182)', fontSize: '15px', fontWeight: '700'}}          
          />
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailsComponent
