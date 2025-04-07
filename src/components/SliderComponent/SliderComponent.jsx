import React from 'react'
import Slider from "react-slick";
import {Image} from 'antd'


const SliderComponent = ({arrImage}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <Slider {...settings}>
            {arrImage.map((image) =>{
                return(
                    <Image key={image} src={image} alt = "slider" preview= {false} width = "100%" height="274px"/>
                )
            })}
        </Slider>
  )
}

export default SliderComponent
