  import React, { useEffect } from 'react'
  import { Badge, Button, Col, Popover} from 'antd';
  import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
  import Search from 'antd/es/transfer/search';
  import { useNavigate } from 'react-router-dom';
  import * as UserService from '../../services/UserService'
  import Loading from '../../components/LoadingComponent/Loading'


  import {
    CaretDownOutlined,
    DownCircleOutlined,
    DownOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
  import { useDispatch, useSelector } from 'react-redux';
  import { resetUser } from '../../redux/slices/userSlice'
import { searchProduct } from '../../redux/slices/productSlice';



  const Header = ({isHiddenSearch = false, isHiddenCart = false}) => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false) 
    const [userName, setUserName] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [search, setSearch] = React.useState('')

    const handleNavigationLogin = () => {
        navigate('/sign-in');
    }

    const handleLogout = async () => {
      setLoading(true)
      await UserService.logoutUser()
      dispatch(resetUser());
      localStorage.removeItem('access_token');
      setLoading(false)
    }

    useEffect(() => {
      setLoading(true)
      setUserName(user?.name)
      setUserAvatar(user?.avatar)
      setLoading(false)
    },[user?.name, user?.avatar])

    const handleNavigationUserInfo = () => {
      navigate('/profile-user');
    }
    const handleNavigationManageSystem = () => {
      navigate('/system/admin');
    }

    const content = (
      <div>
        <WrapperContentPopup onClick={handleNavigationUserInfo}>User Info</WrapperContentPopup>
        {user?.isAdmin &&(
          <WrapperContentPopup onClick={handleNavigationManageSystem}>Manage System</WrapperContentPopup>
        )}
        <WrapperContentPopup onClick={handleLogout}>Log Out</WrapperContentPopup>
      </div>
    );

    const onSearch = (e) =>{
      setSearch(e.target.value)
      dispatch(searchProduct(e.target.value)) ;
    }

    return (
      <div style={{width: '100%', background: '#000', display: 'flex', justifyContent: 'center' }} >
        <WrapperHeader gutter={16} style={{justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
          <Col span={6}>
            <WrapperTextHeader>
              TANTANSHOPPING
            </WrapperTextHeader>
          </Col>
          {!isHiddenSearch && (
            <Col span={12}>
              <ButtonInputSearch
                size = "large"
                placeholder= "Search Your Items"
                textButton = "Search"
                variant = "borderless"
                onChange = {onSearch}
              />
            </Col>
          )}
          <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
            <Loading isLoading={loading}>
              <WrapperHeaderAccount>
                {userAvatar ? (
                  <img src={userAvatar} alt='avatar' style={{
                     width: '30px', 
                     height: '30px', 
                     borderRadius: '50%', 
                     objectFit: 'cover'
                  }}/>
                ) : (
                  <UserOutlined style={{ fontSize: '30px' }} />
                )}
                  {user?.access_token ? (
                    <>
                      <Popover content={content} trigger="click">
                        <div style={{cursor: 'pointer'}} >{userName?.length ? userName : user?.email}</div>
                      </Popover>               
                    </>
                  ) : (
                    <div onClick={handleNavigationLogin} style={{cursor: 'pointer'}} >
                    <WrapperTextHeaderSmall>Log in/Sign in</WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div> 
                  )}       
              </WrapperHeaderAccount>
            </Loading>
            {!isHiddenCart && (
              <div>
                <Badge count={4} size='small'>
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }}  />
                </Badge>
                <WrapperTextHeaderSmall>Shopping Cart</WrapperTextHeaderSmall>
              </div>
            )}
          </Col>
        </WrapperHeader>
      </div>
    )
  }

  export default Header
