import React, { useEffect, useState }  from 'react'
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

const SignUpPage = () => {

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowComfirmPassword, setIsShowComfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )
  const {data, isLoading, isSuccess, isError} = mutation
 
  useEffect(() => {
    if(isSuccess) {
      messages.success('Signup success');
      handleNavigationSignin();
    }
    if(isError) {
      messages.error('Signup error');
    } 
  }, [isSuccess, isError])

  const handleOnchangePassword = (value) => {
    setPassword(value);
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  }

  const handleSignup = () => {
    mutation.mutate({email, password, confirmPassword}, {
      onError: (error) => {
        console.log("Error:", error);
      },
      onSuccess: (data) => {
        console.log("Signup Success:", data);
      }
    })
  }

  const navigate = useNavigate();
  const handleNavigationSignin = () => {
    navigate('/sign-in');
  }

  return (
<div style={{display:'flex', alignItems: 'center', justifyContent: 'center', background:'rgb(0, 0, 0, 0.53', height:'100vh'}}>
      <div style={{width: '800px', height: '445px', borderRadius: '8px', background: '#fff', display:'flex'}}>
          <WrapperLeftContainer>
            <h1>Hello</h1>
            <p>Create Account</p>
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
                style={{marginBottom:'10px'}} 
                placeholder="password" 
                type={isShowPassword ? "text" : "password"} 
                value={password} 
                onChange ={handleOnchangePassword} 
              />
            </div>

            <div style={{position: 'relative'}}>
              <span                    
                    onClick={() => setIsShowComfirmPassword(!isShowComfirmPassword)}             
                    style={{
                      zIndex: 10,
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      cursor: 'pointer',
                      fontSize: '15px'
                    }}

              >
                {isShowComfirmPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
              </span>
              <InputForm 
                style={{marginBottom:'10px'}}   
                placeholder="comfirm password" 
                type={isShowComfirmPassword ? "text" : "password"} 
                value={confirmPassword} 
                onChange ={handleOnchangeConfirmPassword}
              />
            </div>
            {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
            {/* <Loading isLoading={isLoading}> */}
              <ButtonComponent 
                  disabled = {!email.length || !password.length || !confirmPassword.length} 
                  onClick={handleSignup}  
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
                  textButton = {'Sign Up'}
                  styleTextButton = {{color: '#fff', fontSize: '15px', fontWeight: '700'}}          
                />
              {/* </Loading> */}
              <p>Already have an account? <WrapperTextLight onClick={handleNavigationSignin} style={{cursor: 'pointer'}}>Sign in</WrapperTextLight></p>
          </WrapperLeftContainer>
          
          <WrapperRightContainer>
            <Image src ={imageLogo} preview={false} alt="login-image" height="203px" width="203px" />
            <h4>Shopping at TNT Store</h4>
          </WrapperRightContainer>
      </div>
    </div>
  )
}

export default SignUpPage
