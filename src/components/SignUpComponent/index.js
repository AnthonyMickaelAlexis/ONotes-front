import React from 'react';
import TextField from '../TextFieldComponent';
import Button from '../ButtonComponent';
import { useSignUpMutation } from "../../data/auth";
import { useForm, FormProvider } from 'react-hook-form';
import './signUpComponent.scss';
import { useCookies } from 'react-cookie';

function SignUpComponent() {
  const methods = useForm();
  const [cookies, setCookie] = useCookies(['token']);
  const { handleSubmit, watch } = methods;

  const passwordValue = watch("Password");

  const [send] = useSignUpMutation();
  const onSubmit = (e) => {
    send({
      firstname: e.FirstName,
      lastname: e.LastName,
      pseudo: e.Username,
      email: e.Email,
      password: e.Password,
      password_confirmation: e.ConfirmPassword
    })
    .unwrap()
    .then((data) => {
      setCookie('token', data.access_token);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      if (cookies.token) {
        window.location.href = "/profile";
      }
    })
  }
  
  return (
    <FormProvider {...methods}>
      <form className='authentication-signup-form' onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Prénom* :" fieldType="text" fieldName={"FirstName"} />
        <TextField label="Nom* :" fieldType="text" fieldName={"LastName"} />
        <TextField label="Pseudo :" fieldType="text" fieldName={"Username"} />
        <TextField label="Email* :" fieldType="text" fieldName={"Email"} />
        <TextField label="Mot de passe* :" fieldType="password" fieldName={"Password"} />
        <TextField label="Confirmation du mot de passe* :" fieldType="password" fieldName={"ConfirmPassword"} passwordValue={passwordValue} />
        <div className='authentication-signup-form-button'>
          <Button buttonShowText="S'enregistrer"/>
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUpComponent;
