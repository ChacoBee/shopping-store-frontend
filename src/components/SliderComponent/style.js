import { Slider } from "antd";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    & .slick-arrow.slick-prev{
        left: 12px;
        top: 50%;
        z-index: 10;
        &::before{
            font-size: 40px;
            color: #fff;
        }
    }

    & .slick-arrow.slick-next{
        right: 28px;
        top: 50%;
        z-index: 10;
        &::before{
            font-size: 40px;
            color: #fff;
        }
    }
`