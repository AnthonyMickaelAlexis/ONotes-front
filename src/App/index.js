import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { setDevice } from '../reducers/misc';
import Auth from "../views/Auth";
import Homepage from '../views/Homepage';
import NewPost from '../views/NewPost';
import Layout from '../utils/layout';
import Article from '../views/Article';
import ProfileView from '../views/Profile';
import CategoriesPage from '../views/Categories';
import TagsPage from '../views/Tags';
import { useCookies } from 'react-cookie';
import SubcategoriesPage from '../views/Subcategories';
import ArticlesPage from '../views/ArticlesAll';
import NotFound from '../views/Notfound';
import TagPage from '../views/Tag';

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
      <Layout showHeader={!isAuthPage} showFooter={isHomePage} isLogged={isLogged} setIsLogged={setIsLogged} >
        <Routes>
          <Route path="/" element={ <Homepage isLogged={isLogged} /> } />
          <Route path="/authentication" element={ <Auth /> } />
          <Route path="/categories" element={ <CategoriesPage isLogged={isLogged} /> } />
          <Route path="/articles" element={ <ArticlesPage /> } />
          <Route path="/subcategory/:id" element={ <SubcategoriesPage /> } />
          <Route path="/tags" element={ <TagsPage /> } />
          <Route path="/tag/:id" element={ <TagPage /> } />
          {isLogged && (
            <Route path="/profile" element={ <ProfileView /> } />
          )}
          <Route path="/article/:id" element={ <Article /> } />
          <Route path="/profile" element={ <ProfileView /> } />
          <Route path="*" element={<NotFound />} /> 
          {[
            "/new-post",
            "/new-post/draft/:draftId",
            "/new-post/post/:postId",
            "/new-post/draft/:draftId/post/:postId"
          ].map((path, index) => (
            <Route key={index} path={path} element={<NewPost />} />
          ))}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;