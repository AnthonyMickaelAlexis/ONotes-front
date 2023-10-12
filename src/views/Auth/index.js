import React, { useState } from 'react';
import SignInComponent from '../../components/SignInComponent';
import SignUpComponent from '../../components/SignUpComponent';
import { Link } from "react-router-dom";
import ArrowBack from '../../assets/images/arrow-right.svg';
import './auth.scss';
import LoaderComponent from '../../components/LoaderComponent';

function Auth() {
  const [authType, setAuthType] = useState('signIn');
  const [isLoading, setIsLoading] = useState(false);

  let Image;
  if (window.innerWidth < 600 || window.innerHeight < 600) {
    Image = require('../../assets/images/auth-image-mobile.svg').default;
  } else {
    Image = require('../../assets/images/auth-image-desktop.svg').default;
  }

  return (
    <div className="authentication">
      {isLoading && <LoaderComponent />}
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
            <SignInComponent setIsLoading={setIsLoading}  isLoading={isLoading} />
          </>
        }
        { authType === 'signUp' &&
          <>
            <p onClick={() => setAuthType('signIn')}><strong>Connectez-vous ici</strong> si vous avez déjà un compte&nbsp;!</p>
            <SignUpComponent setIsLoading={setIsLoading} isLoading={isLoading} />
          </>
        }
        
      </div>
    </div>
  );
}

export default Auth;