import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';
import Layout from '../utils/layout';
import Article from '../views/Article';
import ProfileView from '../views/Profile';
import { useCookies } from 'react-cookie';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/authentication';
  const isHomePage = location.pathname === '/';
  const [cookie] = useCookies(['token']);
  const [isLogged, setIsLogged] = React.useState(false);
  
  useEffect(() => {
    if (cookie.token === undefined || cookie.token === 'undefined') {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, [cookie]);
  

  return (
    <div className="App">
      <Layout showHeader={!isAuthPage} showFooter={isHomePage} isLogged={isLogged} setIsLogged={setIsLogged} >
        <Routes>
          <Route path="/" element={ <Homepage isLogged={isLogged} /> } />
          <Route path="/authentication" element={ <Auth /> } />
          {isLogged && (
            <Route path="/profile" element={ <ProfileView /> } />
          )}
          <Route path="/article/:id" element={ <Article /> } />
          <Route path="/profile" element={ <ProfileView /> } />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;