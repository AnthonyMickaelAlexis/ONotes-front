import React from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import "./categorycard.scss";

function CategoryCardComponent({
  banner,
  title,
  id,
  bgColor,
  bannerBoolean,
  categoryBoolean,
}) {
  const navigate = useNavigate();

  const navigateToSubpage = () => {
    if (categoryBoolean) {
      navigate(`/subcategory/${id}`);
    } else {
      navigate(`/tags`);
    }
  };

  return (
    <div
      className="category-card"
      style={{ backgroundColor: bgColor }}
      onClick={navigateToSubpage}
    >
      {bannerBoolean && <img src={banner} />}
      <h3>{title}</h3>
      <button>View</button>
    </div>
  );
}

CategoryCardComponent.propTypes = {
  banner: propTypes.string,
  title: propTypes.string.isRequired,
  subTitle: propTypes.string,
  id: propTypes.number.isRequired,
  bgColor: propTypes.string.isRequired,
  bannerBoolean: propTypes.bool.isRequired,
  categoryBoolean: propTypes.bool,
};

export default CategoryCardComponent;
