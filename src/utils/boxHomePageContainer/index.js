import React from 'react';
import ImageWithHalo from '../../components/ImageHalo';
import logo from '../../assets/images/logo_onotes.png';
import appStoreLogo from '../../assets/images/Download_on_the_App_Store_Badge_FR_blk_100517.eps';
import playStoreLogo from '../../assets/images/google-play-badge.eps';
import './boxhomepagecontainer.scss';

const Box = () => (
  <div className="box">
    <h1>NOTRE APPLICATION</h1>
    <div className="content">
     
      <ImageWithHalo src={logo} alt="Sinok des goonies II" />
      <p>Sinok a essayé de jouer aux échecs une fois. Les pions se sont échappés</p>

 
      <ImageWithHalo src={logo} alt="Sinok des goonies II" />
      <p>Sinok a essayé de prendre un selfie. Il a cassé trois téléphones et donné une crise d&apos;identité à la reconnaissance faciale</p>
    
    </div>
    <h2>ON A MÊME NOTRE APPLI !</h2>
    <div className="store-logos">
      <img src={appStoreLogo} alt="App Store" />
      <img src={playStoreLogo} alt="Play Store" />
    </div>
  </div>
);

export default Box;
