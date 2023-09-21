import React from 'react';
import './buttoncomponent.scss';
import { PropTypes } from 'prop-types';

function ButtonComponent({ buttonShowText }) {
  
    return (
      <button type="submit">{buttonShowText}</button>
    );
  }

  ButtonComponent.propTypes = {
    buttonShowText: PropTypes.string.isRequired,
  };

export default ButtonComponent;
