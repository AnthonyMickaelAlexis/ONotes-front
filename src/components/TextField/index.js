import React, { Fragment } from 'react';
import './textfield.scss';
import { PropTypes } from 'prop-types';

function TextField({ fieldType, fieldName, label, register, errors, passwordValue }) {
  let validation = { required: true };
  
  if (fieldName === "ConfirmPassword") {
    validation = {
      ...validation,
      pattern: {
        value: new RegExp(`^${passwordValue}$`),
        message: "Mot de passe différent"
      }
    };
  }

    return (
      <Fragment>
        {label && <label htmlFor={fieldName}>{label}</label>}
        <input name={fieldName} type={fieldType} defaultValue={""} {...register(fieldName, validation)} />
        {errors && errors[fieldName] && <span>{errors[fieldName].message}</span>}
      </Fragment>
    );
  }

  TextField.propTypes = {
    fieldType: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func,
    errors: PropTypes.object,
    passwordValue: PropTypes.string
  };

export default TextField;
