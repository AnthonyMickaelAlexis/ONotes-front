import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <a href="/mentions-legales">Mentions légales</a>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <a href="/conditions">Conditions générales d'utilisation</a>
        <a href="/equipe">Équipe</a>
      </div>
    </div>
  );
}

export default Footer;
