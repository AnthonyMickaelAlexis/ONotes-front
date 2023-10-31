import React from "react";
import "./tagCard.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { rgba } from 'polished';

const TagCardComponent = ({ tag }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tag/${tag.id}`);
  };

  const backgroundColor = rgba(tag.bg_color, 0.33);

  return (
    <div className="tag-card" onClick={handleClick} style={{ backgroundColor }}>
      <div className="tag-symbol">
        <img src={tag.logo} alt={tag.name} />
      </div>
      <div className="tag-name">{tag.name.toUpperCase()}</div>
    </div>
  );
};

TagCardComponent.propTypes = {
  tag: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string,
    bg_color: PropTypes.string,
  }).isRequired,
};

export default TagCardComponent;
