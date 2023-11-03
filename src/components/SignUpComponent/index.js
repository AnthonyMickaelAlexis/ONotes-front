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
      if (error) {
        alert('Erreur lors de l\'inscription')
      }
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
        <TextField datacy="signup-firstname" label="Prénom* :" fieldType="text" fieldName={"FirstName"} />
        <TextField datacy="signup-lastname" label="Nom* :" fieldType="text" fieldName={"LastName"} />
        <TextField datacy="signup-nickname" label="Pseudo :" fieldType="text" fieldName={"Username"} />
        <TextField datacy="signup-email" label="Email* :" fieldType="text" fieldName={"Email"} />
        <TextField datacy="signup-password" label="Mot de passe* :" fieldType="password" fieldName={"Password"} />
        <TextField datacy="signup-confirmpassword" label="Confirmation du mot de passe* :" fieldType="password" fieldName={"ConfirmPassword"} passwordValue={passwordValue} />
        <div className='authentication-signup-form-button'>
          <Button datacy="signup-registerbutton" buttonShowText="S'enregistrer"/>
        </div>
      </form>
    </FormProvider>
  )
}

export default SignUpComponent;
