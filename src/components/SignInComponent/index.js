import React from 'react';
import TextFieldComponent from '../TextFieldComponent';
import ButtonComponent from '../ButtonComponent';
import { useSignInMutation } from "../../data/auth";
import { useForm, FormProvider } from 'react-hook-form';
import './signInComponent.scss';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

function SignInComponent({ setIsLoading, isLoading }) {
  const methods = useForm();
  const navigate = useNavigate();
  const { handleSubmit } = methods;

  const [cookies, setCookie] = useCookies(['token']);

  const [send] = useSignInMutation();
  const onSubmit = (e) => {
    setIsLoading(!isLoading)
    send({
      email: e.Email,
      password: e.Password
    })
    .unwrap()
    .then((data) => {
      setCookie('token', data.access_token);
      console.log(cookies);
      setIsLoading(!isLoading)
      navigate('/profile');
    })
    .catch((error) => {
      if (error.status === 401) {
        alert('Email ou mot de passe incorrect')
        setIsLoading(!isLoading)
        navigate('/');
      }
    })
}

  return (
    <FormProvider {...methods}>
    <form className='authentication-signin-form' onSubmit={handleSubmit(onSubmit)}>
      <TextFieldComponent datacy="signin-email" label="Email* :" placeholder="Adresse email" fieldType="text" fieldName={"Email"} />
      <TextFieldComponent datacy="signin-password" label="Password* :" placeholder="Mot de passe" fieldType="password" fieldName={"Password"} />
      <p className='authentication-signin-form-forgotten-password'>Mot de passe oublié ?</p>
      <div className='authentication-signin-form-button'>
        <ButtonComponent datacy="signin-loginbutton" buttonShowText="Se connecter"/>
      </div>
    </form>
    </FormProvider>
  )
}

SignInComponent.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};
export default SignInComponent;
