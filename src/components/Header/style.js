import styled from  "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
    padding: 10px 0;
    background-color: rgb(0, 0, 0);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
`
export const WrapperTextHeader = styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 146, 255);
    }
    padding: 10px 20px;
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
    color: #000;
`