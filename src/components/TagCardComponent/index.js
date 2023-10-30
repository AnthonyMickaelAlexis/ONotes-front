/* eslint-disable */

import React from "react";
import "./tagCard.scss";

const TagCardComponent = ({ tag }) => (
  <div className="tag-card">
    <div className="tag-symbol">
      <img src={tag.logo} alt={tag.name} />
    </div>
    <div className="tag-name">{tag.name.toUpperCase()}</div>
  </div>
);

export default TagCardComponent;
