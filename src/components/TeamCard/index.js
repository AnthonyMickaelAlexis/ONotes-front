import React, { useEffect, useRef } from 'react';
import { ModifyHalo } from "../../utils/haloModifier";
import PropTypes from 'prop-types';

import './teamCard.scss';

function TeamCard({ image, color, name, role, description }) {

  // Halo manager
  const halo = useRef();
  let haloObj;
  useEffect(() => {
    if (!halo.current) return;
    halo.current.style.backgroundColor = color;
    haloObj = new ModifyHalo(halo.current);
    haloObj.start();
    return () => {
      haloObj.stop();
    };
  }, [])

  return (
    <div className='team-card-container'>
      <div ref={halo} className="team-card-halo"></div>
      <div className='team-card'>
        <img src={image} />
        <h2>{name}</h2>
        <p className='team-card-role'>{role}</p>
        <p className='team-card-description'>{description}</p>
      </div>
    </div>
  );
}

TeamCard.propTypes = {
  image: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  description: PropTypes.string,
};

export default TeamCard;
