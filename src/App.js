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
import * as CateService from '~/services/CateService'
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LoadingHasChil from './components/LoadingComponent/LoadingHasChil';
import { updateCate } from './redux/slides/categorySlide';


function App() {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const fetchCate = async () => {
    try {
      const res = await CateService.getAllCate();
      dispatch(updateCate(res))
      return res
    } catch (error) {
      console.error("Error fetching data:", error);
      return
    }
  };

  useEffect(() => {
    setIsLoading(true)
    fetchCate()
    let storageData = localStorage.getItem('accessToken')
    storageData = JSON.parse(storageData)
    handleGetDetailsUser(storageData)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleGetDetailsUser = async (token) => {
    try {
      const response = await UserService.getDetailsUser(token)
      // dispatch(updateUser({ ...response?.data }))
      dispatch(updateUser({ ...response, accessToken: token }))
    } catch (error) {
      console.log(error)
    }

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
