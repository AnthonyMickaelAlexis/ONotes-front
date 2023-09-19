import React from 'react';
import TextField from '../TextField';

function SignUp() {

  return (
    <div>
      <TextField fieldType="text" fieldName={"First Name"} />
      <TextField fieldType="text" fieldName={"Last Name"} />
      <TextField fieldType="text" fieldName={"Username"} />
      <TextField fieldType="text" fieldName={"Email"} />
      <TextField fieldType="password" fieldName={"Password"} />
      <TextField fieldType="password" fieldName={"Confirm Password"} />
    </div>
  )
}

export default SignUp;