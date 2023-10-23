import React, { Fragment, useEffect, useState } from 'react'
import { routes } from "~/routes";
import DefaultComponent from "~/components/DefaultComponent/DefaultComponent.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import * as UserService from '~/services/UserService'
import { updateUser } from './redux/slides/userSlide';
import { isJsonString } from './utils';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
    setIsLogin(localStorage.getItem('accessToken'))
    console.log('islogged in', isLogin)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      console.log('decoded', decoded)
      console.log('storageData', storageData)
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('accessToken')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      console.log("storageData", storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData }
  }

  const handleGetDetailsUser = async (id, token) => {
    const response = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...response?.data, accessToken: token }))
    setIsLoading(false)
  }
  return (
    <>
      <Router>
        <Routes>
          {
            routes.map((route, index) => {
              const Page = route.page
              let Layout = route.isShowHeader ? DefaultComponent : Fragment
              // // if (route.isShowHeaderAdmin) {
              // //   Layout = ForAdmin
              // // }
              // console.log('Page', Page)
              return (
                <Route path={route.path} key={index} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
