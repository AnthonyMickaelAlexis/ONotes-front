import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { saveDraft } from '../../reducers/drafts';
import Selector from '../../components/Selector';
import ImageUpload from '../../components/ImageUpload';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import Tag from '../../components/TagComponent';

import './newPost.scss';

function NewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drafts = useSelector(state => state.drafts);
  const device = useSelector(state => state.misc.device);
  const draftIndex = useRef();
  const postId = useRef();
  const draftId = useRef();
  const [draftData, setDraftData] = useState({
    category: {},
    subCategory: {},
    tags: [],
    title: '',
    subtitle: '',
    banner: '',
    excerpt: '',
    content: '',
    createdTags: []
  });
  const newTagPopup = useRef();
  const [tagText, setTagText] = useState();
  const [tagTextColor, setTagTextColor] = useState('#000AFF');
  const [tagBgColor, setTagBgColor] = useState('#FFA800');
  const [tagIcon, setTagIcon] = useState();
  const [deleteIcon, setDeleteIcon] = useState(0);
  const [deleteItem, setDeleteItem] = useState([0, '']);
  const confirmationPopup = useRef();
  const publishPopup = useRef();

  // Find the draft id and load it or give new draft id
  useEffect(() => {
    if (id) {
      draftIndex.current = drafts.findIndex(e => e.draftId.toString() === id);
      if (draftIndex.current === -1) return navigate('/');
      postId.current = drafts[draftIndex.current].postId;
      draftId.current = drafts[draftIndex.current].draftId;
      setDraftData(drafts[draftIndex.current]);
    } else {
      let newDraftId = 0;
      drafts.forEach(draft => {
        if (draft.draftId > newDraftId) {
          newDraftId = draft.draftId + 1;
        }
      })
      draftId.current = newDraftId;
    }
  }, [])

  const saveDraftFunction = () => {
    dispatch(saveDraft({
      postId: postId.current,
      draftId: draftId.current,
      category: draftData.category,
      subCategory: draftData.subCategory,
      tags: draftData.tags,
      title: sanitizeHtml(draftData.title),
      subtitle: sanitizeHtml(draftData.subtitle),
      banner: draftData.banner,
      excerpt: sanitizeHtml(draftData.excerpt),
      content: sanitizeHtml(draftData.content),
      createdTags: draftData.createdTags
    }));
    confirmationPopup.current.style.display = 'flex';
    setTimeout(() => {
      confirmationPopup.current.animate(
        [{opacity: 1}, {opacity: 0}],
        {duration: 500, iterations: 1, easing: 'linear', fill: 'forwards'}
      )
    }, 1000)
    setTimeout(() => {
      confirmationPopup.current.style.display = 'none';
      confirmationPopup.current.animate(
        [{opacity: 0}, {opacity: 1}],
        {duration: 5, iterations: 1, easing: 'linear', fill: 'forwards'}
      )
    }, 1500)
  }

  // Open the creation tag popup when a new tag is selected
  const newTagCreated = (tag) => {
    setTagText(tag);
    newTagPopup.current.style.display = 'flex';
  }

  const saveCreatedTag = () => {
    setDraftData({...draftData, createdTags: [
      ...draftData.createdTags, {
        text: tagText,
        textColor: tagTextColor,
        bgColor: tagBgColor,
        ...(tagIcon != null) && {icon: tagIcon}
      }
    ]});
    closeTagPopup();
  }

  const dismissCreatedTag = () => {
    setDeleteItem(deleteItem => [deleteItem[0] +1, tagText]);
    closeTagPopup();
  }

  const closeTagPopup = () => {
    newTagPopup.current.style.display = 'none';
    setTagText('');
    setTagTextColor('#000AFF');
    setTagBgColor('#FFA800');
    setTagIcon(null);
    setDeleteIcon(deleteIcon => deleteIcon + 1);
  }

  // Handle the publish confirmation popup
  const handlePublishPopup = (action) => {
    action === 'open' ? publishPopup.current.style.display = "flex" : publishPopup.current.style.display = "none";
  }

  const publish = () => {
    handlePublishPopup('close');
  }

  const  modules  = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
    { label: "Choix1", value: "choix1" },
    { label: "Choix2", value: "choix2" },
    { label: "Choix3", value: "choix3" },
    { label: "Choix4", value: "choix4" },
    { label: "Choix5", value: "choix5" },
  ];

  useEffect(() => {
    options.sort((a, b) => {
      if (a.label.toLowerCase() < b.label.toLowerCase()) {
        return -1;
      } else if (a.label.toLowerCase() > b.label.toLowerCase()) {
        return 1;
      }
      return 0;
    })
  }, [])
  
  return (
    <div className='new-post'>
      <h1>Rédigez votre meilleur article !</h1>
      <div className='new-post-categories-and-tags'>
        <div className='new-post-categories-and-tags-category'>
          <Selector
            items={options}
            alreadySelected={[draftData.category]}
            label={'Catégorie'}
            creatable={false}
            multiSelect={false}
            closeAfterSelected={true}
            getSelectedItems={item => setDraftData({...draftData, category: item[0]})}
          />
        </div>
        <div className='new-post-categories-and-tags-subcategory'>
          <Selector
            items={options}
            alreadySelected={[draftData.subCategory]}
            label={'Sous-catégorie'}
            creatable={false}
            multiSelect={false}
            closeAfterSelected={true}
            getSelectedItems={item => setDraftData({...draftData, subCategory: item[0]})}
          />
        </div>
        <div className='new-post-categories-and-tags-tags'>
          <Selector
            items={options}
            alreadySelected={draftData.tags}
            label={'Tags'}
            creatable={true}
            created={newTagCreated}
            deleteItem={deleteItem}
            getSelectedItems={tags => setDraftData({...draftData, tags})}
          />
        </div>
      </div>
      <div className='new-post-titles'>
        <input
          className='new-post-titles-field'
          type='text'
          placeholder='Le titre de votre article'
          value={draftData.title}
          onChange={e => setDraftData({...draftData, title: e.target.value})}
        />
        <input
          className='new-post-titles-field'
          type='text'
          placeholder='Le sous-titre de votre article'
          value={draftData.subtitle}
          onChange={e => setDraftData({...draftData, subtitle: e.target.value})}
        />
      </div>
      <ImageUpload
        index={1}
        width={device === 'mobile' ? '100%' : '80%'}
        height= {device === 'mobile' ? '8rem' : '12rem'}
        text={
          device === 'mobile' || device === 'portraitTablet'
          ? 'Ajouter une bannière.'
          : 'Glissez déposez ou cliquez pour ajouter une bannière.'
        }
        setImage={draftData.banner}
        getImage={banner => setDraftData({...draftData, banner})}
      />
      <div className='new-post-excerpt'>
        <textarea
          className='new-post-excerpt-field'
          type='text'
          placeholder='Le résumé de votre article'
          value={draftData.excerpt}
          onChange={e => setDraftData({...draftData, excerpt: e.target.value})}
        />
      </div>
      <div className='new-post-editor-container'>
        <ReactQuill theme='snow' modules={modules} value={draftData.content} onChange={content => setDraftData({...draftData, content})} />
      </div>
      <div className='new-post-actions'>
        <button className='new-post-actions-button' onClick={saveDraftFunction}>
          {device === 'mobile' ? 'Sauvegarder' : 'Sauvegarder le brouillon'}
        </button>
        <button className='new-post-actions-button' onClick={() => handlePublishPopup('open')}>
          {device === 'mobile' ? 'Publier' : 'Publier votre article'}
        </button>
      </div>
      <div ref={newTagPopup} className='new-post-new-tag'>
        <div className='new-post-new-tag-container'>
          <p className='new-post-new-tag-container-title'>Création d&apos;un nouveau tag</p>
          <Tag icon={tagIcon} text={tagText ?? ''} textColor={tagTextColor} bgColor={tagBgColor} />
          <div className='new-post-new-tag-container-body'>
            <div className='new-post-new-tag-container-body-element'>
              <label htmlFor="color1">Couleur de texte :</label>
              <input type="color" id="color1" name="color1" value={tagTextColor} onChange={e => setTagTextColor(e.target.value)} />
            </div>
            <div className='new-post-new-tag-container-body-element'>
              <label htmlFor="color2">Couleur de fond :</label>
              <input type="color" id="color2" name="color2" value={tagBgColor} onChange={e => setTagBgColor(e.target.value)} />
            </div>
            <hr />
            <div className='new-post-new-tag-container-body-icon'>
              <p>Icône :</p>
              <ImageUpload index={2} width={'100%'} height={'5rem'} getImage={(icon) => setTagIcon(icon)} deleteImage={deleteIcon} /> 
            </div>
          </div>
          <div className='new-post-new-tag-container-buttons'>
            <button onClick={dismissCreatedTag}>Annuler</button>
            <button onClick={saveCreatedTag}>Sauvegarder</button>
          </div>
        </div>
      </div>
      <div ref={confirmationPopup} className='new-post-save-confirmation'>
        <div className='new-post-save-confirmation-container'>
          <p>Votre brouillon a bien été sauvegardé !</p>
        </div>
      </div>
      <div ref={publishPopup} className='new-post-publish-confirmation'>
        <div className='new-post-publish-confirmation-container'>
          <p>Votre article est prêt ? Publiez-le !</p>
          <div className='new-post-publish-confirmation-container-actions'>
            <button onClick={() => handlePublishPopup('close')}>Annuler</button>
            <button onClick={publish}>Publier</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
