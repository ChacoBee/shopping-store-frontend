import React, {Fragment, useEffect, useState} from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slices/userSlice';
import Loading from './components/LoadingComponent/Loading';

function App() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const {storeageData, decoded} = handleDecode()
    if(decoded?.id) {
      handleGetDetailUser(decoded?.id, storeageData);
    }  
    setIsLoading(false);
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
    try {
      const res = await UserService.getDetailUser(id, token);
      dispatch(updateUser({...res?.data, access_token: token}));
    } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);  
      }
    };
    



  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? Default : Fragment;

              return isCheckAuth && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}
export default App;