import React from "react";
import './header.scss';
import logo from '../../assets/images/logo-black.svg';
import PropTypes from 'prop-types';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import ExploreComponent from "../ExploreComponent";

function Header({ isLogged }) {
  const [cookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="left-section">
        <img src={logo}  alt="Logo" className="logo" onClick={() => navigate('/')}/>
      </div>
      <div className="center-section">
        <ExploreComponent />
      </div>
      <div className="right-section">
        {!isLogged && <button className="login-button" onClick={() => navigate('/authentication')}>Connexion/Inscription</button>}
        {isLogged && <button className="login-button" onClick={() => {
          cookie && removeCookie('token');
          navigate('/');
        }}>Déconnexion</button>}
      </div>
    </div>
  )
}

Header.propTypes = {
  isLogged: PropTypes.bool
};
export default Header;