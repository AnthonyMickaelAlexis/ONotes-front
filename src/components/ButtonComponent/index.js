import React from 'react';
import './buttonComponent.scss';
import { PropTypes } from 'prop-types';

function ButtonComponent({ buttonShowText, datacy }) {
  
    return (
      <div className='submit-button-container'>
        <button data-cy={datacy} className='submit-button' type="submit">{buttonShowText}</button>
      </div>
    );
  }

  ButtonComponent.propTypes = {
    buttonShowText: PropTypes.string.isRequired,
    datacy: PropTypes.string
  };

export default ButtonComponent;
