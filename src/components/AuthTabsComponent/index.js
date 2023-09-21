import React, { useState } from 'react';
import SignInComponent from '../SignInComponent';
import SignUpComponent from '../SignUpComponent';
import './authtabscomponent.scss';

function AuthTabsComponent() {
    const [selectedTab, setSelectedTab] = useState('signIn');

    return (
      <div className="auth-tabs">
        <div className="tab-headers">
        <button className={selectedTab === 'signIn' ? 'active' : ''} onClick={() => setSelectedTab('signIn')}>Connexion</button>
        <button className={selectedTab === 'signUp' ? 'active' : ''} onClick={() => setSelectedTab('signUp')}>Inscription</button>
        </div>
        {selectedTab === 'signIn' && <SignInComponent />}
        {selectedTab === 'signUp' && <SignUpComponent />}
      </div>
    );
  }

export default AuthTabsComponent;
