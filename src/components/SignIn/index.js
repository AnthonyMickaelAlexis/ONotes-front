import React from 'react';
import TextField from '../TextField';
import Button from '../Button';
// import { useSigninMutation } from "../../data/auth";
import { useForm } from 'react-hook-form';

function SignIn() {
  const { handleSubmit, register, errors } = useForm();
  // const [send, error, isLoading] = useSigninMutation();
  const onSubmit = () => {
    // send({
    //   email: e.Email,
    //   password: e.Password
    // })
    // .unwrap()
    // .then(data => {
    //   console.log(data);
    // })
    // .catch(error => {
    //   console.log(error);
    // }); 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email :" placeholder="Adresse email" fieldType="text" fieldName={"Email"} register={register} errors={errors} />
      <TextField label="Password :" placeholder="Mot de passe" fieldType="password" fieldName={"Password"} register={register} errors={errors} />
      <Button buttonShowText="Se connecter"/>
    </form>
  )
}


export default SignIn;
