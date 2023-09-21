import React from 'react';
import AuthTabs from '../../components/AuthTabs';
import './auth.scss';

function Auth() {
  
  return (
    <div className="App">
      <p>Sign In</p>
      <div className='BoxAroundConnectionTextfield'>
      <AuthTabs />
      </div>
    </div>
  );
}

export default Auth;