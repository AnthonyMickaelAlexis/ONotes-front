import React from "react";
import propTypes from "prop-types";
import "./categorycard.scss";

function CategoryCardComponent({ banner, title, id }) {
    return (
        <div className="category-card" onClick={() => console.log(id)}>
            <img src={banner} />
            <h3>{title}</h3>
            <button>View</button>
        </div>
    )
}

CategoryCardComponent.propTypes = {
    banner: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    subTitle: propTypes.string.isRequired,
    id: propTypes.string.isRequired
}

export default CategoryCardComponent;