import React from 'react';
import { Link } from "react-router-dom";
import './footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <Link to='/legal'>Mentions légales</Link>
        <Link to='/terms-of-service'>Conditions générales d&apos;utilisation</Link>
        <Link to='/team'>Équipe</Link>
      </div>
    </div>
  );
}

export default Footer;
