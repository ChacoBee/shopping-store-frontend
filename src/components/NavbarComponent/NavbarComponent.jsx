import React from 'react'
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style'
import { Checkbox } from 'antd';
import { Rate } from 'antd';



const NavbarComponent = () => {

    const onChange = () =>{

    }
    
    const rednerContent = (type, options)=>{
        switch(type){
            case 'text':
                return options.map((option) =>{
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return(
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) =>{
                            return(
                                <Checkbox style={{marginLeft: 0}} value = {option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return(
                    options.map((option) =>{
                        return(
                            <div style= {{display: 'flex', gap: '4px' }} >
                                <Rate style={{fontSize: '12px'}} disabled defaultValue={option} />
                                <span>{`From ${option} star`}</span>
                            </div>
                        )
                    })
                )
            case 'price':
                return(
                    options.map((option) =>{
                        return(
                            <WrapperTextPrice>{option}</WrapperTextPrice>
                        )
                    })
                )
            default:
                return{}
        }
    }

    return (
        <div style={{}} >
        <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {rednerContent('text', ['Fridge', 'TV', 'Laptop'])}
            </WrapperContent>
            <WrapperContent>
                {rednerContent('checkbox', [
                        {value: 'a', label: 'A'},
                        {value: 'b', label: 'B'}
                    ])}
            </WrapperContent>
            <WrapperContent>
                {rednerContent('star', [3, 4, 5])}
            </WrapperContent>
            <WrapperContent>
                {rednerContent('price', ['under $50', '$50 - $100', 'above $100'])}
            </WrapperContent>
        </div>
    )
}

export default NavbarComponent
