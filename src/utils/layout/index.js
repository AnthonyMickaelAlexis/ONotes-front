import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

Layout.propTypes = {
    children: PropTypes.node,
  };

export default Layout;
