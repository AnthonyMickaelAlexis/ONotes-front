import React from "react";
import { PropTypes } from 'prop-types';
import './tagComponent.scss';
import { useNavigate } from "react-router-dom";

function TagComponent({ id, icon, text, textColor, bgColor, link, position }) {
  const navigate = useNavigate();
  const goToRoute = () => {
    link ? navigate(link) : navigate(`/tag/${id}`);
  }
  return (
    <div className='tag-component falling-tag' style={{backgroundColor: bgColor, position: `${position ? position : 'relative'}`}} onClick={goToRoute}>
      <img src={icon} />
      <p style={{color: textColor, fontSize: '0.7rem'}}>{text.length > 5 ? text.substring(0,5) + '...' : text}</p>
    </div>
  )
}
TagComponent.propTypes = {
  id: PropTypes.number,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  link: PropTypes.string,
  position: PropTypes.string,
};
export default TagComponent;