import React from 'react';
import TextField from '../TextField';
import Button from '../Button';
import { useSignUpMutation } from "../../data/auth";
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

function SignUp() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const methods = useForm();

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
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    }); 
  }
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Prénom :" fieldType="text" fieldName={"FirstName"} register={register} />
        <TextField label="Nom :" fieldType="text" fieldName={"LastName"} register={register} />
        <TextField label="Pseudo :" fieldType="text" fieldName={"Username"} register={register} />
        <TextField label="Email :" fieldType="text" fieldName={"Email"} register={register} />
        <TextField label="Password :" fieldType="password" fieldName={"Password"} register={register} />
        <TextField label="Confirm password :" fieldType="password" fieldName={"ConfirmPassword"} register={register} passwordValue={passwordValue} />
        <Button buttonShowText="S'enregistrer"/>
      </form>
    </FormProvider>
  )
}

export default SignUp;
