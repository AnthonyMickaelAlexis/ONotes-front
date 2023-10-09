import React from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import './navigationButtonComponent.scss';

function NavigationButtonComponent({ text, icon, textColor, bgColor, link }) {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(link);
  }

  return (
    <div className='navigation-button'>
      <div className='navigation-button-content' style={{color: textColor, backgroundColor: bgColor}} onClick={goToPage}>
        <p>{text}</p>
        {icon !== null &&
          <img src={icon} />
        }
      </div>
    </div>
  );
}

NavigationButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default NavigationButtonComponent;