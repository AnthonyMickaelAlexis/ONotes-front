import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ children, showHeader = true, showFooter = false  }) => (
  <div>
    {showHeader && <Header />}
    <main>{children}</main>
    {showFooter && <Footer />}
  </div>
);

Layout.propTypes = {
    children: PropTypes.node,
    showHeader: PropTypes.bool,
    showFooter: PropTypes.bool,
  };

export default Layout;
