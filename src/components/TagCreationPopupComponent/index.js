import React, { useState } from 'react';
import Tag from '../TagComponent';
import ImageUpload from '../ImageUpload';
import { PropTypes } from 'prop-types';
import './tagCreationPopupComponent.scss';

function TagCreationPopupComponent({ display, text, imageIndex, submit, dismiss }) {
  const [tagTextColor, setTagTextColor] = useState('#000AFF');
  const [tagBgColor, setTagBgColor] = useState('#FFA800');
  const [tagIcon, setTagIcon] = useState();
  const [deleteIcon, setDeleteIcon] = useState(0);

  const saveCreatedTag = () => {
    submit({
      text: text,
      textColor: tagTextColor,
      bgColor: tagBgColor,
      ...(tagIcon != null) && {icon: tagIcon}
    })
    closeTagPopup();
  }

  const dismissCreatedTag = () => {
    dismiss(text);
    closeTagPopup();
  }

  const closeTagPopup = () => {
    setTagTextColor('#000AFF');
    setTagBgColor('#FFA800');
    setTagIcon(null);
    setDeleteIcon(deleteIcon => deleteIcon + 1);
  }

  return (
    <div className='new-tag-popup' style={{ display: display }}>
      <div className='new-tag-popup-container'>
        <p className='new-tag-popup-container-title'>Création d&apos;un nouveau tag</p>
        <Tag icon={tagIcon} text={text ?? ''} textColor={tagTextColor} bgColor={tagBgColor} />
        <div className='new-tag-popup-container-body'>
          <div className='new-tag-popup-container-body-element'>
            <label htmlFor="color1">Couleur de texte :</label>
            <input type="color" id="color1" name="color1" value={tagTextColor} onChange={e => setTagTextColor(e.target.value)} />
          </div>
          <div className='new-tag-popup-container-body-element'>
            <label htmlFor="color2">Couleur de fond :</label>
            <input type="color" id="color2" name="color2" value={tagBgColor} onChange={e => setTagBgColor(e.target.value)} />
          </div>
          <hr />
          <div className='new-tag-popup-container-body-icon'>
            <p>Icône :</p>
            <ImageUpload index={imageIndex} width={'100%'} height={'5rem'} getImage={(icon) => setTagIcon(icon)} deleteImage={deleteIcon} /> 
          </div>
        </div>
        <div className='new-tag-popup-container-buttons'>
          <button onClick={dismissCreatedTag}>Annuler</button>
          <button onClick={saveCreatedTag}>Sauvegarder</button>
        </div>
      </div>
    </div>
  );
}

TagCreationPopupComponent.propTypes = {
  display: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageIndex: PropTypes.number.isRequired,
  submit: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
};

export default TagCreationPopupComponent;