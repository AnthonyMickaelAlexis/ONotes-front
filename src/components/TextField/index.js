import React from 'react';
import './textfield.scss';
import { PropTypes } from 'prop-types';
import { useForm } from "react-hook-form";

function TextField({ fieldType, fieldName }) {
    const { register, formState: { errors } } = useForm();
  
    return (
      <form>
        <input type={fieldType} defaultValue={""} {...register(fieldName)} />
        <input type={fieldType} {...register("Required Field", { required: true })} />
        {errors["Required Field"] && <span>This field is required</span>}
        <input type="submit" />
      </form>
    );
  }

  TextField.propTypes = {
    fieldType: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
  };

  export default TextField;
  