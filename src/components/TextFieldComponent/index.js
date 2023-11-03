import React from 'react';
import './textfieldcomponent.scss';
import { PropTypes } from 'prop-types';
import { useFormContext } from "react-hook-form";

function TextFieldComponent({
  fieldType,
  fieldName,
  label,
  passwordValue,
  datacy,
  signInError,
  errorMessage,
}) {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  let validation;

  switch(fieldName) {
    case "Email":
      validation = {
        required: true,
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Adresse email invalide.",
        },
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
          message: "Le mot de passe doit contenir au moins 8 caractères.",
        },
      };
      break;
    case "ConfirmPassword":
      validation = {
        pattern: {
          value: new RegExp(`^${passwordValue}$`),
          message: "Le mot de passe de confirmation ne correspond pas.",
        },
      };
      break;
  }

  return (
    <>
      <div className="text-field">
        {label && <label htmlFor={fieldName}>{label}</label>}
        <input
          data-cy={datacy}
          name={fieldName}
          type={fieldType}
          defaultValue={""}
          {...register(fieldName, validation)}
          aria-invalid={errors.firstName ? `${signInError}` : `${signInError}`}
        />
      </div>
      {signInError && (
        <p className="signin-error" role="alert">
          {errorMessage}
        </p>
      )}
      {signInError && <p className="signin-error" role="alert"></p>}
    </>
  );
}

TextFieldComponent.propTypes = {
  fieldType: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  passwordValue: PropTypes.string,
  datacy: PropTypes.string,
  signInError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default TextFieldComponent;
