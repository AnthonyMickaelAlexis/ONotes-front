import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setDevice } from '../reducers/misc';
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';
import NewPost from '../views/NewPost';
import Layout from '../utils/layout';
import ProfileView from '../views/Profile';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/authentication';
  const isHomePage = location.pathname === '/';

  const dispatch = useDispatch();

  const getScreenSize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let device;
    if (screenWidth < 600 || screenHeight < 600) device = 'mobile';
    if (screenWidth >= 600 && screenWidth < 900) device = 'portraitTablet';
    if (screenWidth >= 900) device = 'desktop';
    dispatch(setDevice(device));
  }
  window.addEventListener('resize', getScreenSize);

  useEffect(() => {
    getScreenSize();
  }, [])

  return (
    <div className="App">
      <Layout showHeader={!isAuthPage} showFooter={isHomePage}>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/authentication" element={ <Auth /> } />
          <Route path="/profile" element={ <ProfileView /> } />
          <Route path="/new-post/:id" element={ <NewPost /> } />
          <Route path="/new-post/" element={ <NewPost /> } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;