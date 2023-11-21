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
import LoadingHasChil from './components/LoadingComponent/LoadingHasChil';


function App() {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true)
    let storageData = localStorage.getItem('accessToken')
    console.log("localStorage", storageData)
    storageData = JSON.parse(storageData)
    handleGetDetailsUser(storageData)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleGetDetailsUser = async (token) => {
    const response = await UserService.getDetailsUser(token)
    console.log("response", response)
    // dispatch(updateUser({ ...response?.data }))
    dispatch(updateUser({ ...response?.user, accessToken: token }))
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
              return (
                <Route path={route.path} key={index} element={
                  <Layout>
                    <LoadingHasChil isLoading={isLoading}>
                      <Page />
                    </LoadingHasChil>
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
