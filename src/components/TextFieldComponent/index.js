import React, { Fragment } from 'react';
import './textfieldcomponent.scss';
import { PropTypes } from 'prop-types';
import { useFormContext } from "react-hook-form";

function TextFieldComponent({ fieldType, fieldName, label, passwordValue }) {
  const { formState: {errors}, register } = useFormContext();
  let validation;
  
  switch(fieldName) {
    case "Email":
      validation = {
        required: "Vous n'avez pas renseigné votre email.",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Adresse email invalide."
        }
      };
      break;
    case "FirstName":
      validation = {
        required: "Vous n'avez pas renseigné votre prénom.",
      };
      break;
    case "LastName":
      validation = {
        required: "Vous n'avez pas renseigné votre nom.",
      };
      break;
    case "Password":
      validation = { 
        required: "Vous n'avez pas renseigné votre mot de passe.", 
        minLength: { 
          value: 8, 
          message: "Le mot de passe doit contenir au moins 8 caractères." 
        } 
      };
      break;
    case "ConfirmPassword":
      validation = {
        pattern: {
          value: new RegExp(`^${passwordValue}$`),
          message: "Le mot de passe de confirmation ne correspond pas."
        }
      };
      break;
  }

  console.log("Field Name: ", fieldName, "Field Type: ", fieldType);
  console.log("Validation rules for ", fieldName, ": ", validation);

  if (errors && errors[fieldName]) {
    console.log("Error in field ", fieldName, ": ", errors[fieldName].message);
  }
  
  return (
    <>
      <div className='text-field'>
        {label && <label htmlFor={fieldName}>{label}</label>}
        <input name={fieldName} type={fieldType} defaultValue={""} {...register(fieldName, validation )} />
      </div>
      {errors && errors[fieldName] && <span>{errors[fieldName].message}</span>}
    </>
  );
}

TextFieldComponent.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  passwordValue: PropTypes.string
};

export default TextFieldComponent;
