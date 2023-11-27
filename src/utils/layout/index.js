import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ children, showHeader = true, showFooter = false , isLogged = false, setIsLogged }) => (
  <div>
    {showHeader && <Header isLogged={isLogged} setIsLogged={setIsLogged} />}
    <main>{children}</main>
    {showFooter && <Footer />}
  </div>
);

Layout.propTypes = {
    children: PropTypes.node,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
    isLogged: PropTypes.bool,
    setIsLogged: PropTypes.func
  };

export default Layout;
