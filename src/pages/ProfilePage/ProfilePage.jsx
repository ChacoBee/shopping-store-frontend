import React, { use, useEffect } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutation'
import * as message from '../../components/Messages/Messages'
import { updateUser } from '../../redux/slices/userSlice'


const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')    
    const [address, setAddress] = React.useState('')
    const [avatar, setAvatar] = React.useState('')

    const mutation = useMutationHooks(
        (data) => {
            const {id, access_token, ...rests} = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()
    const {data, isLoading, isSuccess, isError} = mutation;

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if(isSuccess) {
            message.success('Update success')
            handleGetDetailUser(user?.id, user?.access_token)
        }else if(isError) {
            message.error('Update error')
        }
    }, [isSuccess, isError])

    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({...res?.data, access_token: token}));
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)

    }
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = (value) => {
        setAvatar(value)
    }

    const handleUpdate = () => {
        mutation.mutate({id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token}, {
            onError: (error) => {
                console.log("Error:", error);
            },
            onSuccess: (data) => {
                console.log("Login Success:", data);
            },
        });

    }



    return (
        <div style={{ width: '1270px', margin: '0 auto', padding: '20px', height: '500px' }}>
            <WrapperHeader>
                User Profile
            </WrapperHeader>
            <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                        <InputForm
                            id = 'name'
                            style={{ width: '300px' }}
                            value={name}
                            onChange ={handleOnchangeName}
                        />
                        <ButtonComponent 
                            onClick={handleUpdate}
                            size={40} 
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px'
                            }} 
                            textButton = {'Update'}
                            styleTextButton = {{color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700'}}  
                        >                  

                    </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <InputForm
                            id = 'email'
                            style={{ width: '300px' }}
                            value={email}
                            onChange ={handleOnchangeEmail}
                        />
                        <ButtonComponent 
                            onClick={handleUpdate}
                            size={40} 
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px'
                            }} 
                            textButton = {'Update'}
                            styleTextButton = {{color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700'}}  
                        >                  

                    </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                        <InputForm
                            id = 'phone'
                            style={{ width: '300px' }}
                            value={phone}
                            onChange ={handleOnchangePhone}
                        />
                        <ButtonComponent 
                            onClick={handleUpdate}
                            size={40} 
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px'
                            }} 
                            textButton = {'Update'}
                            styleTextButton = {{color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700'}}  
                        >                  

                    </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                        <InputForm
                            id = 'address'
                            style={{ width: '300px' }}
                            value={address}
                            onChange ={handleOnchangeAddress}
                        />
                        <ButtonComponent 
                            onClick={handleUpdate}
                            size={40} 
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px'
                            }} 
                            textButton = {'Update'}
                            styleTextButton = {{color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700'}}  
                        >                  

                    </ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                        <InputForm
                            id = 'avatar'
                            style={{ width: '300px' }}
                            value={avatar}
                            onChange ={handleOnchangeAvatar}
                        />
                        <ButtonComponent 
                            onClick={handleUpdate}
                            size={40} 
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                borderRadius: '4px',
                                padding: '4px 6px 6px'
                            }} 
                            textButton = {'Update'}
                            styleTextButton = {{color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700'}}  
                        >                  
                    </ButtonComponent>
                    </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}

export default ProfilePage
