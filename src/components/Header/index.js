import React from "react";
import './header.scss';
import logo from '../../assets/images/logo-black.svg';

function Header() {

  return (
    <div className="header">
      <div className="left-section">
        <img src={logo}  alt="Logo" className="logo"/>
      </div>
      <div className="right-section">
        <button className="login-button">Connexion/Inscription</button>
      </div>
    </div>
  )
}

export default Header;