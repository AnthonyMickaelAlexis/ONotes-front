import React from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import './navigationButtonComponent.scss';

function NavigationButtonComponent({ text, icon, textColor, bgColor, link, isMenuOpen }) {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(link);
  }

  return (
    <div className='navigation-button'>
      <div className='navigation-button-content' style={{color: textColor, backgroundColor: bgColor}} onClick={goToPage}>
        {icon !== null &&
          <img src={icon} />
        }
        {isMenuOpen &&
          <p>{text}</p>
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
  link: PropTypes.string.isRequired,
  isMenuOpen: PropTypes.bool
};

export default NavigationButtonComponent;