import React from "react";
import { PropTypes } from 'prop-types';
import './tagComponent.scss';
import { useNavigate } from "react-router-dom";

function TagComponent({ icon, text, textColor, bgColor }) {
  const navigate = useNavigate();
  const goToRoute = () => {
    navigate('/authentication');
  }

  return (
    <div className='tag-component falling-tag' style={{backgroundColor: bgColor}} onClick={goToRoute}>
      <img src={icon} />
      <p style={{color: textColor}}>{text}</p>
    </div>
  )
}

TagComponent.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default TagComponent;
