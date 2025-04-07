import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import OrderPage from './pages/OrderPage/OrderPage';

import { routes } from './routes';
import Header from './components/Header/Header';
import Default from './components/Default/Default';
import axios from 'axios';

import {useQuery} from '@tanstack/react-query'
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from '../src/services/UserService'
import {useDispatch} from 'react-redux'
import { updateUser } from './redux/slices/userSlice';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const {storeageData, decoded} = handleDecode()
    if(decoded?.id) {
      handleGetDetailUser(decoded?.id, storeageData);
    }  
  }, [])

  const handleDecode = ()=>{
    let storeageData = localStorage.getItem('access_token');
    let decoded = {}
    if(storeageData && isJsonString(storeageData)) {
      storeageData = JSON.parse(storeageData);
      decoded = jwtDecode(storeageData);
    }
    return {decoded, storeageData}
  }
  
  UserService.axiosJwt.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const {decoded} = handleDecode()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token}));
    console.log('res: ', res);
  }



  return (
    <div>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? Default :  Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                }/>
              )
            })}
          </Routes>
        </Router>
    </div>
  )
}
export default App;