import React, { Fragment } from 'react';
import './textfield.scss';
import { PropTypes } from 'prop-types';
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

function TextField({ fieldType, fieldName, label, passwordValue }) {
  const { formState: {errors}, register } = useFormContext();
  let validation = { required: true };
  
  switch(fieldName) {
    case "Password":
      validation = { 
        required: "required", 
        minLength: { 
          value: 3, 
          message: "Le mot de passe doit contenir au moins 3 caractères" 
        } 
      };
      break;
    case "Email":
      validation = {
        ...validation,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Adresse email invalide"
        }
      };
      break;
    case "ConfirmPassword":
      validation = {
        ...validation,
        pattern: {
          value: new RegExp(`^${passwordValue}$`),
          message: "Mot de passe différent"
        }
      };
      break;
    default:
      validation = {
        ...validation,
        pattern: {
          value: 1,
          message: "Veuillez remplir ce champ"
        }
      };
      break;
  }

    return (
      <Fragment>
        {label && <label htmlFor={fieldName}>{label}</label>}
        <input name={fieldName} type={fieldType} defaultValue={""} {...register(fieldName, validation)} />
        <ErrorMessage errors={errors} name="ErrorInput" />
        <ErrorMessage errors={errors} name="ErrorInput" render={({ message}) => <p>{message}</p>} />
        {errors && errors[fieldName] && <span>{errors[fieldName].message}</span>}
      </Fragment>
    );
  }

  TextField.propTypes = {
    fieldType: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    passwordValue: PropTypes.string
  };

export default TextField;
