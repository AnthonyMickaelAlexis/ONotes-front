import React, { useState } from 'react';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import './tab.scss';

function AuthTabs() {
    const [selectedTab, setSelectedTab] = useState('signIn');

    return (
      <div className="auth-tabs">
        <div className="tab-headers">
        <button className={selectedTab === 'signIn' ? 'active' : ''} onClick={() => setSelectedTab('signIn')}>Connexion</button>
        <button className={selectedTab === 'signUp' ? 'active' : ''} onClick={() => setSelectedTab('signUp')}>Inscription</button>
        </div>
        {selectedTab === 'signIn' && <SignIn />}
        {selectedTab === 'signUp' && <SignUp />}
      </div>
    );
  }

export default AuthTabs;
