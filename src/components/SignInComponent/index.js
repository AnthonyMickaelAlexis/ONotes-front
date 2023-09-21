import React from 'react';
import TextFieldComponent from '../TextFieldComponent';
import ButtonComponent from '../ButtonComponent';
import { useSignInMutation } from "../../data/auth";
import { useForm, FormProvider } from 'react-hook-form';

function SignInComponent() {
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
      <TextFieldComponent label="Email :" placeholder="Adresse email" fieldType="text" fieldName={"Email"} />
      <TextFieldComponent label="Password :" placeholder="Mot de passe" fieldType="password" fieldName={"Password"} />
      <ButtonComponent buttonShowText="Se connecter"/>
    </form>
    </FormProvider>
  )
}

export default SignInComponent;
