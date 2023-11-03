import React from "react";
import iExplore from "../../assets/icons/explore-icon.svg"
import "./exploreComponent.scss";

function ExploreComponent() {

    
    return (
        <div className="explore">
            <i className="explore-icon"><img src={iExplore} /></i>
            <input type="text" placeholder="Rechercher..." />
        </div>
    )
}

export default ExploreComponent;