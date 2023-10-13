import React from "react";
import { PropTypes } from 'prop-types';
import './tagComponent.scss';
import { useNavigate } from "react-router-dom";

function TagComponent({ icon, text, textColor, bgColor, link, position }) {
  const navigate = useNavigate();
  const goToRoute = () => {
    link ? navigate(link) : navigate('/');
  }

  return (
    <div className='tag-component falling-tag' style={{backgroundColor: bgColor, position: `${position ? position : 'relative'}`}} onClick={goToRoute}>
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
  link: PropTypes.string,
  position: PropTypes.string,
};

export default TagComponent;
