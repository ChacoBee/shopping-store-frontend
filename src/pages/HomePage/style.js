import styled from "styled-components";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'

export const WrapperTypedProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    border-bottom: 1px solid black;
    font-size: 20px;
    margin: 10px;
    height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13, 92, 182);
    }
    border: 1px solid rgb(11, 116, 229);
    color: rgb(11, 116, 229);
    width: 240px;
    height: 38px;
    border-radius: 4px;
    background: #fff;
`

export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-top: 20px;
    flex-wrap: wrap;
`