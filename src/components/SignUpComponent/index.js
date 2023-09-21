import React from 'react';
import TextField from '../TextFieldComponent';
import Button from '../ButtonComponent';
import { useSignUpMutation } from "../../data/auth";
import { useForm, FormProvider } from 'react-hook-form';

function SignUpComponent() {
  const methods = useForm();
  const { handleSubmit, watch } = methods;

  const passwordValue = watch("Password");

  const [send] = useSignUpMutation();
  const onSubmit = (e) => {
    send({
      firstName: e.FirstName,
      lastName: e.LastName,
      username: e.Username,
      email: e.Email,
      password: e.Password
    })
    .unwrap()
  }
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Prénom :" fieldType="text" fieldName={"FirstName"} />
        <TextField label="Nom :" fieldType="text" fieldName={"LastName"} />
        <TextField label="Pseudo :" fieldType="text" fieldName={"Username"} />
        <TextField label="Email :" fieldType="text" fieldName={"Email"} />
        <TextField label="Password :" fieldType="password" fieldName={"Password"} />
        <TextField label="Confirm password :" fieldType="password" fieldName={"ConfirmPassword"} passwordValue={passwordValue} />
        <Button buttonShowText="S'enregistrer"/>
      </form>
    </FormProvider>
  )
}

export default SignUpComponent;
