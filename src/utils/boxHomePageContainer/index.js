import React from 'react';
import ImageWithHalo from '../../components/ImageHalo';
import logo from '../../assets/images/kermit.png';
import appStoreLogo from '../../assets/images/app_store_fr_badge.svg';
import playStoreLogo from '../../assets/images/google-play-badge.png';
import './boxhomepagecontainer.scss';
import appli from '../../assets/images/test onotes 1.png'
const Box = () => (
  <div className="box">
    <h1>NOTRE APPLICATION</h1>
    <div className="content">
        <span>
          <ImageWithHalo texttype="1" src={logo} alt="Sinok des goonies II" className="application-images"/>
          <p className='boxparagraph'><strong>Code Chronicles :</strong> Plongez dans l&apos;univers du code, où chaque ligne est une <b>énigme</b> et chaque algorithme est une <b>aventure</b>. 
            Partagez vos expériences de <b>programmation</b>, posez des questions et <b>découvrez les secrets du langage machine.</b></p>
        </span>  
        <span>
          <p className='boxparagraph'><strong>Bits & Bytes Bistro</strong> : Une tasse de café, un clavier et des discussions animées sur les dernières tendances technologiques. 
            Discutez de tout, des langages de <b>programmation</b> à <b>l&apos;intelligence artificielle</b>, tout en profitant de l&apos;ambiance conviviale d&apos;un <b>bistro numérique.</b></p>
          <ImageWithHalo texttype="2" src={logo} alt="Sinok des goonies II" className="application-images"/>
        </span>
      <h3>NOTRE APPLI EST EN COURS DE DEVELOPPEMENT</h3>
      <div>
        <img src={appli} alt="Application" className="application-images" id='appimage'/>
      </div>
      <div className="store-logos">
        <img src={appStoreLogo} alt="App Store" />
        <img src={playStoreLogo} alt="Play Store" className='playstorelogo'/>
      </div>
    </div>
  </div>
);

export default Box;
