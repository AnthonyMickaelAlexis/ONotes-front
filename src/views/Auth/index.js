import React from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

function Auth() {
  
  return (
    <div className="App">
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Auth;