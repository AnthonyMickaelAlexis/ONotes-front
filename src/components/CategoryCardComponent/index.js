import React from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import "./categorycard.scss";

function CategoryCardComponent({ banner, title, id, bannerBoolean }) {
  const navigate = useNavigate();

  const navigateToSubcategory = () => {
    navigate(`/subcategory/${id}`);
  };
  return (
    <div
      className="category-card"
      onClick={navigateToSubcategory}
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
  bannerBoolean: propTypes.bool.isRequired,
};

export default CategoryCardComponent;
