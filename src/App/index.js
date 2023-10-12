import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';
import Layout from '../utils/layout';
import Article from '../views/Article';

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
          <Route path="/article/:id" element={ <Article /> } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;