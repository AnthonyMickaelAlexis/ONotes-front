import React, { Fragment } from 'react';
import './textfield.scss';
import { PropTypes } from 'prop-types';
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

function TextField({ fieldType, fieldName, label, register, passwordValue }) {
  const { formState: {errors}, value, watch } = useFormContext();
  let validation = { required: true };
  
  if (fieldName === "Password") {
    validation = 
      { required: "required", minLength: {
        value: 3,
        message: "Le mot de passe doit contenir au moins 3 caractères"
      }
    }
  } else if (fieldName === "Email") {
    validation = {
      ...validation,
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Adresse email invalide"
      }
    }
  } else if (fieldName === "ConfirmPassword") {
    validation = {
      ...validation,
      pattern: {
        value: new RegExp(`^${passwordValue}$`),
        message: "Mot de passe différent"
      }
    };
  } else {
    validation = {
      ...validation,
      pattern: {
        value: 1,
        message: "Veuillez remplir ce champ"
      }
    }
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
    register: PropTypes.func,
    passwordValue: PropTypes.string
  };

export default TextField;
