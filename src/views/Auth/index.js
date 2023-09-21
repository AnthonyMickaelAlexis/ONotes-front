import React from 'react';
import AuthTabsComponent from '../../components/AuthTabsComponent';
import './auth.scss';

function Auth() {
  
  return (
    <div className="App">
      <p>Sign In</p>
      <div className='BoxAroundConnectionTextfield'>
      <AuthTabsComponent />
      </div>
    </div>
  );
}

export default Auth;