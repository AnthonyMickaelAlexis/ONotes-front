import React from 'react';
import TextField from '../TextField';
import Button from '../Button';
import { useForm } from 'react-hook-form';

function SignUp() {
  const { handleSubmit, register, errors, watch } = useForm();

  const passwordValue = watch("Password");

  const onSubmit = (e) => {
    console.log(e);
  }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Prénom :" fieldType="text" fieldName={"FirstName"} register={register} errors={errors} />
      <TextField label="Nom :" fieldType="text" fieldName={"LastName"} register={register} errors={errors} />
      <TextField label="Pseudo :" fieldType="text" fieldName={"Username"} register={register} errors={errors} />
      <TextField label="Email :" fieldType="text" fieldName={"Email"} register={register} errors={errors} />
      <TextField label="Password :" fieldType="password" fieldName={"Password"} register={register} errors={errors} />
      <TextField label="Confirm password :" fieldType="password" fieldName={"ConfirmPassword"} register={register} errors={errors} passwordValue={passwordValue} />
      <Button buttonShowText="S'enregistrer"/>
    </form>
  )
}

export default SignUp;
