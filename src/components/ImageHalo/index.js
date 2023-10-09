import React from 'react';
import './imagehalo.scss';
import PropTypes from 'prop-types';

const ImageWithHalo = ({ src, alt }) => (
  <div className="image-container">
    <div className="halo">
    <img src={src} alt={alt} />
    </div>
  </div>
);

ImageWithHalo.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    };

export default ImageWithHalo;
