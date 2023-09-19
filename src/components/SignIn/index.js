import React from 'react';
import TextField from '../TextField';

function SignIn() {

  return (
    <div>
      <TextField fieldType="text" fieldName={"Email"} />
      <TextField fieldType="password" fieldName={"Password"} />
      <TextField fieldType="text" fieldName={"Email"} />
      <TextField fieldType="password" fieldName={"Password"} />
      <TextField fieldType="password" fieldName={"Password"} />
      <TextField fieldType="password" fieldName={"Password"} />
    </div>
  )
}

export default SignIn;