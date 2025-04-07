import React from 'react'
import ProductType from '../../components/ProductType/ProductType'
import { WrapperButtonMore, WrapperProducts, WrapperTypedProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import CardComponent from '../../components/CardComponent/CardComponent'


import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import slider4 from '../../assets/images/slider4.webp'
import slider5 from '../../assets/images/slider5.webp'
import slider6 from '../../assets/images/slider6.webp'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

const HomePage = () => {
  const arr = ['TV', 'Fridge', 'Laptop']
  return (
    <>
    <div style={{ width: '1270px', margin: '0 auto'}}>
      <WrapperTypedProduct>
        {arr.map((item) => {
          return(
            <ProductType name = {item}  key={item} />
          )
        })}
      </WrapperTypedProduct>
      </div>
      <div className="body" style={{width: '100%', backgroundColor: '#efefef'}}>
        <div id='container' style={{backgroundColor: '#efefef', padding: '0 120px', height: '1000px', width: '100%'}}>
          <SliderComponent arrImage = {[slider1, slider2, slider3, slider4, slider5, slider6]} />
          <WrapperProducts>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              
          </WrapperProducts>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}> 
            <WrapperButtonMore textButton = "See More" type ="outline" styleTextButton = {{fontWeight: 600}}/>  
          </div>
            <NavbarComponent />
        </div>
      </div>
      Home Page
    </>
  )
}

export default HomePage
