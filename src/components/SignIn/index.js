import React from 'react';
import TextField from '../TextField';
import Button from '../Button';
import { useSignInMutation } from "../../data/auth";
import { useForm, FormProvider } from 'react-hook-form';

function SignIn() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const [send] = useSignInMutation();
  const onSubmit = (e) => {
    send({
      email: e.Email,
      password: e.Password
    })
    .unwrap()
  }

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email :" placeholder="Adresse email" fieldType="text" fieldName={"Email"} />
      <TextField label="Password :" placeholder="Mot de passe" fieldType="password" fieldName={"Password"} />
      <Button buttonShowText="Se connecter"/>
    </form>
    </FormProvider>
  )
}

export default SignIn;
