import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './imagehalo.scss';
import { ModifyHalo } from '../../utils/haloModifier';
import { useEffect } from 'react';

const ImageWithHalo = ({ src, alt, texttype }) => {
  const className = texttype === '1' ? 'class-1' : texttype === '2' ? 'class-2' : 'default-class';

  const halo4 = useRef();
  let halo4Obj;

  useEffect(() => {
    halo4Obj= new ModifyHalo(halo4.current);
    halo4Obj.start();
  
    return () => {
      halo4Obj.stop();
    }
  }, [])

return (
  <div className="image-container">
    <div>
    <h3 className={className}>{texttype === '1' ? 'LE CONCEPT' : texttype === '2' ? 'LA COMMUNAUTE' : ''}</h3>
      <span>
        <img src={src} alt={alt} className='application-images'/>
      </span>
    <div ref={halo4} className='homepage-halo4'>
    </div>
    </div>
  </div>
  );
} 

ImageWithHalo.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    texttype: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    };
  
export default ImageWithHalo;
