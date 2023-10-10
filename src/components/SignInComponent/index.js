import React from 'react';
import TextFieldComponent from '../TextFieldComponent';
import ButtonComponent from '../ButtonComponent';
import { useSignInMutation } from "../../data/auth";
import { useForm, FormProvider } from 'react-hook-form';
import './signInComponent.scss';

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
    <form className='authentication-signin-form' onSubmit={handleSubmit(onSubmit)}>
      <TextFieldComponent label="Email* :" placeholder="Adresse email" fieldType="text" fieldName={"Email"} />
      <TextFieldComponent label="Password* :" placeholder="Mot de passe" fieldType="password" fieldName={"Password"} />
      <p className='authentication-signin-form-forgotten-password'>Mot de passe oublié ?</p>
      <div className='authentication-signin-form-button'>
        <ButtonComponent buttonShowText="Se connecter"/>
      </div>
    </form>
    </FormProvider>
  )
}

export default SignInComponent;
