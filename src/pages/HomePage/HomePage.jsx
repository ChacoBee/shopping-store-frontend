import React, { useEffect, useRef, useState } from 'react'
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
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {

  const searchProduct = useSelector((state) => state?.product?.search)
  const refSearch = useRef()
  const searchDebounce = useDebounce(searchProduct, 1000)

  const [stateProducts, setStateProducts] = useState([])

  const arr = ['TV', 'Fridge', 'Laptop']

  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search)
    if(search?.length > 0 || refSearch.current){
      setStateProducts(res?.data)
    }else{
      return res
    }
  }

  useEffect(() =>{
    if(refSearch.current){
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
  },[searchDebounce])

  const {isLoading, data: products} = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000
  });

  useEffect(() =>{
    if(products?.data?.length > 0){
      setStateProducts(products?.data)
    }
  },[products])

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
              {stateProducts?.map((product) => {
                return(
                  <CardComponent 
                    key={product._id} 
                    countInStock = {product.countInStock}
                    description = {product.description}
                    image = {product.image} 
                    name = {product.name} 
                    price = {product.price}
                    rating = {product.rating}
                    type = {product.type}
                    sold = {product.sold}
                    discount = {product.discount}
                  />
                )
              })}
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
