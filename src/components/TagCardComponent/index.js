/* eslint-disable */

import React from "react";
import "./tagCard.scss";

const TagCardComponent = ({ tag }) => (
  <div>
    <div className="tag-symbol">{tag.logo}</div>
    <div>{tag.name}</div>
  </div>
);

export default TagCardComponent;
