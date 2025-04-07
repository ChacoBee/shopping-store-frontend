import { Input } from 'antd'
import React, {useState} from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    
    // const [valueInput, setValueInput] = useState('')
    const {placeholder = "Enter text",onChange, ...rests} = props

    const handleOnchangeInput = (e) => {
        if(onChange) {
            onChange(e.target.value);
        }
    }
    return (
        <>
            <WrapperInputStyle placeholder = {placeholder} value = {props.value} {...rests} onChange={handleOnchangeInput} >
            </WrapperInputStyle>
        </>
    )
}

export default InputForm
