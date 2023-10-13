import React from "react";
import propTypes from "prop-types";
import "./categorycard.scss";

function CategoryCardComponent({ banner, title, id, bgColor }) {
    return (
        <div className="category-card" style={{backgroundColor: bgColor}} onClick={() => console.log(id)}>
            <img src={banner} />
            <h3>{title}</h3>
            <button>View</button>
        </div>
    )
}

CategoryCardComponent.propTypes = {
    banner: propTypes.string,
    title: propTypes.string.isRequired,
    subTitle: propTypes.string,
    id: propTypes.number.isRequired,
    bgColor: propTypes.string.isRequired,
}

export default CategoryCardComponent;