import React from 'react';
import './buttonComponent.scss';
import { PropTypes } from 'prop-types';

function ButtonComponent({ buttonShowText }) {
  
    return (
      <div className='submit-button-container'>
        <button className='submit-button' type="submit">{buttonShowText}</button>
      </div>
    );
  }

  ButtonComponent.propTypes = {
    buttonShowText: PropTypes.string.isRequired,
  };

export default ButtonComponent;
