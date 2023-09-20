import React from 'react';
import './button.scss';
import { PropTypes } from 'prop-types';

function Button({ buttonShowText }) {
  
    return (
      <button type="submit">{buttonShowText}</button>
    );
  }

  Button.propTypes = {
    buttonShowText: PropTypes.string.isRequired,
  };

export default Button;
