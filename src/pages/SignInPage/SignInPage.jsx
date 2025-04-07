import React, { useEffect, useState } from 'react'
import { WrapperLeftContainer, WrapperRightContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { Image } from 'antd'

import imageLogo from '../../assets/images/sign-in.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutation'
import Loading from '../../components/LoadingComponent/Loading'
import * as messages from '../../components/Messages/Messages'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slices/userSlice'

const SignInPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation;

  useEffect(() => {
    if(isSuccess) {
      messages.success('Signup success');
      navigation('/');
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      if(data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if(decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    }
    if(isError) {
      messages.error('Signup error');
    } 
  }, [isSuccess, isError])

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token}));
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  }
  const handleOnchangePassword = (value) => {
    setPassword(value);
  }



  const handleNavigationSignup = () => {
    navigation('/sign-up');
  }


  const handleSignin = () => {
    mutation.mutate({ email, password }, {
      onError: (error) => {
        console.log("Error:", error);
      },
      onSuccess: (data) => {
        console.log("Login Success:", data);
      },
    });
  };
  return (
    <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', background:'rgb(0, 0, 0, 0.53', height:'100vh'}}>
      <div style={{width: '800px', height: '445px', borderRadius: '8px', background: '#fff', display:'flex'}}>
          <WrapperLeftContainer>
            <h1>Hello</h1>
            <p>Login into your account</p>
            <InputForm 
              style={{marginBottom:'10px'}} 
              placeholder="abc@gmail.com" 
              value={email}
              onChange ={handleOnchangeEmail}
            />
            <div style={{position: 'relative'}}>
              <span 
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    style={{
                      zIndex: 10,
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}
              >
                {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
              </span>
              <InputForm 
                placeholder="password" 
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange ={handleOnchangePassword} 
              />
            </div> 
            {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
            {/* <Loading isLoading={isLoading}> */}
              <ButtonComponent
                  disabled={!email.length || !password.length}
                  onClick={handleSignin}
                  // bordered= {false}
                  size={40} 
                  styleButton={{
                    background: 'rgb(255, 27, 69)',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '4px',
                    margin: '25px 0 10px'
                  }} 
                  textButton = {'Log in'}
                  styleTextButton = {{color: '#fff', fontSize: '15px', fontWeight: '700'}}          
                ></ButtonComponent>
              {/* </Loading> */}
              <p><WrapperTextLight>Forgot Passsword?</WrapperTextLight></p>
              <p>Dont have account? <WrapperTextLight onClick={handleNavigationSignup} style={{cursor: 'pointer'}}> Create Account</WrapperTextLight></p>
          </WrapperLeftContainer>
          
          <WrapperRightContainer>
            <Image src ={imageLogo} preview={false} alt="login-image" height="203px" width="203px" />
            <h4>Shopping at TNT Store</h4>
          </WrapperRightContainer>
      </div>
    </div>
  )
}

export default SignInPage
