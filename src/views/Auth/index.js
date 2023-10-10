import React, { useState } from 'react';
import SignInComponent from '../../components/SignInComponent';
import SignUpComponent from '../../components/SignUpComponent';
import { Link } from "react-router-dom";
import ArrowBack from '../../assets/images/arrow-right.svg';
import './auth.scss';

function Auth() {
  const [authType, setAuthType] = useState('signIn');

  let Image;
  if (window.innerWidth < 600 || window.innerHeight < 600) {
    Image = require('../../assets/images/auth-image-mobile.svg').default;
  } else {
    Image = require('../../assets/images/auth-image-desktop.svg').default;
  }

  return (
    <div className="authentication">
      <div className='authentication-image'>
        <img src={Image} />
      </div>
      <div className='authentication-main'>
        <Link to='/' style={{ textDecoration: 'none', color: 'black', width: 'fit-content' }}>
          <div className='authentication-main-back'>
            <img src={ArrowBack} />
            <p>Retour au site</p>
          </div>
        </Link>
        <h1>Bienvenue !</h1>
        { authType === 'signIn' &&
          <>
            <p onClick={() => setAuthType('signUp')}><strong>Créez un compte gratuitement</strong> si vous n&apos;en avez pas déjà un&nbsp;!</p>
            <SignInComponent />
          </>
        }
        { authType === 'signUp' &&
          <>
            <p onClick={() => setAuthType('signIn')}><strong>Connectez-vous ici</strong> si vous avez déjà un compte&nbsp;!</p>
            <SignUpComponent />
          </>
        }
        
      </div>
    </div>
  );
}

export default Auth;