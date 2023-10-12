import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';
import Layout from '../utils/layout';
import ProfileView from '../views/Profile';
import CategoriesPage from '../views/Categories';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/authentication';
  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      <Layout showHeader={!isAuthPage} showFooter={isHomePage}>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/authentication" element={ <Auth /> } />
          <Route path="/categories" element={ <CategoriesPage /> } />
          <Route path="/profile" element={ <ProfileView /> } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;