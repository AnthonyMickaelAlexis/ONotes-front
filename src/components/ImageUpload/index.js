import React, { useEffect, useState, useRef } from "react";
import { PropTypes } from 'prop-types';

import './imageUpload.scss';

function ImageUpload({ index, width, height, text, setImage, getImage, deleteImage }) {
  const [dragActive, setDragActive] = useState(false);
  const imageRef = useRef();
  
  useEffect(() => {
    if (setImage) imageRef.current.src = setImage;
  }, [setImage])

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      saveImage(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e) =>{
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      saveImage(e.target.files[0]);
    }
  };

  const getBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const saveImage = (image) => {
    if(image.type.indexOf('image/') === 0) {
      imageRef.current.src = URL.createObjectURL(image);
      getBase64(image).then(
        data => getImage(data)
      );
    }
  }

  useEffect(() => {
    if (deleteImage !== 0) imageRef.current.src = '';
  }, [deleteImage])
  
  return (
    <form className='image-upload-form' style={{ width: width && width, height: height && height }} onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input type="file" accept="image/*" className='image-upload-input' id={`image-upload-input-${index ?? 0}`} multiple={false} onChange={handleChange} />
      <label className={`image-upload-label ${dragActive ? 'image-upload-label-drag-active' : ''}`} htmlFor={`image-upload-input-${index ?? 0}`}>
        <img ref={imageRef} className='image-upload-image' style={{ maxWidth: width && width, maxHeight: height && height }} />
        {text && <p className='image-upload-text'>{text}</p>}
      </label>
      { dragActive && <div className='image-upload-drag-element' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
    </form>
  );
}

ImageUpload.propTypes = {
  index: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  text: PropTypes.string,
  setImage: PropTypes.string,
  getImage: PropTypes.func,
  deleteImage: PropTypes.number
};

export default ImageUpload;
