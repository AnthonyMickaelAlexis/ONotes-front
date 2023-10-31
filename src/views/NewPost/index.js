import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery, useGetCategoryQuery, useGetSubcategoriesByCategoryQuery } from '../../data/categories';
import { useGetSubcategoryQuery, useGetSubcategoriesQuery } from '../../data/subcategories';
import { useGetTagsQuery } from '../../data/tags';
import { saveDraft, deleteDraft } from '../../reducers/drafts';
import { useGetArticleQuery, useSendArticleMutation } from '../../data/articles';
import NavigationMenuComponent from '../../components/NavigationMenuComponent';
import Selector from '../../components/Selector';
import ImageUpload from '../../components/ImageUpload';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import TagCreationPopupComponent from '../../components/TagCreationPopupComponent';
import { useGetUserProfileQuery } from '../../data/user';
import { useCookies } from 'react-cookie';
import LoaderComponent from '../../components/LoaderComponent';
import './newPost.scss';

function NewPost() {
  const { draftId, postId } = useParams();
  const [cookies] = useCookies(['token']);
  const [unauthorizedUser, setUnauthorizedUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drafts = useSelector(state => state.drafts);
  const device = useSelector(state => state.misc.device);
  const [draftData, setDraftData] = useState({
    postId: null,
    draftId: null,
    category: {},
    subCategory: {},
    tags: [],
    title: '',
    subtitle: '',
    banner: '',
    excerpt: '',
    content: '',
    createdTags: [],
    status: 'draft'
  });
  const [newTagPopup, setNewTagPopup] = useState('none');
  const newTagText = useRef('');
  const [deleteItem, setDeleteItem] = useState([0, '']);
  const confirmationPopup = useRef();
  const publishPopup = useRef();

  const {data: profile, isSuccess: profileFetched} = useGetUserProfileQuery({ token: cookies.token });
  const {data: post, isSuccess: postFetched} = useGetArticleQuery(postId, {skip: !postId});

  // Find the draft or create it
  useEffect(() => {
    if (draftId && !postId) {
      const draftIndex = drafts.findIndex(e => e && e.draftId.toString() === draftId);
      if (draftIndex === -1) return navigate('/new-post');
      setDraftData(drafts[draftIndex]);
    }
    if (!draftId && !postId) {
      let newDraftId = 0;
      drafts.forEach(draft => {
        if (draft.draftId >= newDraftId) {
          newDraftId = draft.draftId + 1;
        }
      })
      setDraftData({...draftData, draftId: newDraftId});
    }
  }, [])

  // Store fetched post draft
  useEffect(() => {
    if (postFetched && post.status === 200 && profileFetched && profile.status === 200) {
      if (post.data.user_id !== profile.data[0].id) {
        setUnauthorizedUser(true);
      } else {
        const tags = post.data.tag.map(tag => ({
          label: tag.name,
          value: tag.id
        }));
        setDraftData({...draftData,
          postId,
          ...(post.data.subcategory_id !== null) && {subCategory: {value: post.data.subcategory_id}},
          ...(tags.length !== 0) && {tags},
          ...(post.data.title !== null) && {title: post.data.title},
          ...(post.data.subtitle !== null) && {subtitle: post.data.subtitle},
          ...(post.data.banner !== null) && {banner: post.data.banner},
          ...(post.data.resume !== null) && {excerpt: post.data.resume},
          ...(post.data.text_content !== null) && {content: post.data.text_content},
          ...(post.data.status !== null) && {status: post.data.status}
        })
      }
    }
  }, [postFetched, profileFetched])

  const {data: postSubCategory} = useGetSubcategoryQuery(
    post && post.data.subcategory_id,
    {skip: postFetched === false}
  );

  useEffect(() => {
    if (postSubCategory) {
      setDraftData({
        ...draftData,
        subCategory: {label: postSubCategory.data.name, value: postSubCategory.data.id},
        category: {value: postSubCategory.data.category_id}
      });
    }
  }, [postSubCategory])

  const {data: postCategory} = useGetCategoryQuery(
    draftData.category.value,
    {skip: postFetched === false || draftData.category.value === undefined}
  );

  useEffect(() => {
    if (postCategory) {
      setDraftData({
        ...draftData,
        category: {label: postCategory.data[0].name, value: postCategory.data[0].id}
      });
    }
  }, [postCategory])

  // Get categories
  const {data: categoriesList} = useGetCategoriesQuery();

  // Get all subCategories
  const {data: subCategoriesList} = useGetSubcategoriesQuery(
    { skip: 'value' in draftData.category }
  );

  // Get subCategories by category
  const {data: subCategoriesByCategoryList} = useGetSubcategoriesByCategoryQuery(
    draftData.category.value,
    { skip: postFetched || !('value' in draftData.category) }
  );

  // Get tags
  const {data: tagsList} = useGetTagsQuery();

  // Sanitize and sort tags
  const prepareDraft = () => {
    const title = sanitizeHtml(draftData.title);
    const subtitle = sanitizeHtml(draftData.subtitle);
    const excerpt = sanitizeHtml(draftData.excerpt);
    const content = sanitizeHtml(draftData.content);
    let nonCreatedTags = [];
    draftData.tags.forEach(tag => {
      if (!('__isNew__' in tag)) {
        nonCreatedTags.push(tag);
      }
    })
    setDraftData({...draftData, 
      title, subtitle, excerpt, content, tags: nonCreatedTags
    });
  }

  // Store the draft in redux
  const saveDraftFunction = () => {
    prepareDraft();
    dispatch(saveDraft(draftData));
    if (draftData.status === 'draft') send('draft');
    confirmationPopup.current.style.display = 'flex';
    setTimeout(() => {
      if (confirmationPopup.current) {
        confirmationPopup.current.animate(
          [{opacity: 1}, {opacity: 0}],
          {duration: 500, iterations: 1, easing: 'linear', fill: 'forwards'}
        )
      }
    }, 1000)
    setTimeout(() => {
      if (confirmationPopup.current) {
        confirmationPopup.current.style.display = 'none';
        confirmationPopup.current.animate(
          [{opacity: 0}, {opacity: 1}],
          {duration: 5, iterations: 1, easing: 'linear', fill: 'forwards'}
        )
      }
    }, 1500)
  }

  // Open the creation tag popup when a new tag is selected
  const newTagCreated = (tag) => {
    newTagText.current = tag;
    setNewTagPopup('flex');
  }

  const saveCreatedTag = (newTag) => {
    setDraftData({...draftData, createdTags: [
      ...draftData.createdTags, {
        text: newTag.text,
        textColor: newTag.textColor,
        bgColor: newTag.bgColor,
        ...(newTag.icon != null) && {icon: newTag.icon}
      }
    ]});
    setNewTagPopup('none');
  }

  const dismissCreatedTag = (tagText) => {
    setDeleteItem(deleteItem => [deleteItem[0] +1, tagText]);
    setNewTagPopup('none');
  }

  // Handle the publish confirmation popup
  const handlePublishPopup = (action) => {
    action === 'open' ? publishPopup.current.style.display = "flex" : publishPopup.current.style.display = "none";
  }

  // Send draft to API
  const [sendArticle, {isLoading: sendArticleLoading, isSuccess: sendArticleSuccess, isError: sendArticleError}] = useSendArticleMutation();
  
  const convertData = () => {
    const profileData = profile.data[0];
    prepareDraft();
    let tags;
    if (draftData.tags.length > 0) {
      tags = draftData.tags.map(tag => tag.value);
    }
    let newTags;
    if (draftData.createdTags.length > 0) {
      newTags = draftData.createdTags.map(newTag => ({
        name: newTag.text,
        ...(newTag.icon != null) && {logo: newTag.icon},
        color: newTag.textColor,
        bg_color: newTag.bgColor
  
      }))
    }
    return {
      ...(draftData.postId !== null) && {postId: draftData.postId},
      authorId: profileData.id,
      title: draftData.title,
      ...(draftData.subtitle !== '') && {subtitle: draftData.subtitle},
      ...(draftData.excerpt !== '') && {excerpt: draftData.excerpt},
      content: draftData.content,
      ...(draftData.banner !== '') && {banner: draftData.banner},
      subCategory: draftData.subCategory.value,
      ...(tags !== null) && {tags},
      ...(newTags !== null) && {newTags},
      token: cookies.token,
    }
  }
  
  const [redirectAfterSend, setRedirectAfterSend] = useState();
  const send = (postStatus) => {
    const data = convertData();
    data.status = postStatus;
    data.method = postId ? 'PUT' : 'POST';
    setRedirectAfterSend(postStatus === 'published' ? true : false);
    sendArticle(data) 
  }

  useEffect(() => {
    if (sendArticleSuccess && redirectAfterSend) {
      dispatch(deleteDraft(draftData.draftId));
      navigate('/profile');
    }
  }, [sendArticleSuccess])

  // Quill toolbar description
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
  
  return (
    <>
      {unauthorizedUser &&
        <div className='new-post-unauthorized'>
          <h1>Tu n&apos;es pas autorisé à modifier cet article ! Comment es-tu arrivé ici d&apos;ailleurs ?</h1>
        </div>
      }
      {!unauthorizedUser &&
        <div className='new-post'>
          <NavigationMenuComponent />
          <h1>Rédigez votre meilleur article !</h1>
          <div className='new-post-categories-and-tags'>
            <div className='new-post-categories-and-tags-category'>
              <Selector
                items={categoriesList && categoriesList.data}
                alreadySelected={draftData.category.label && draftData.category.value && [draftData.category]}
                label={'Catégorie'}
                creatable={false}
                multiSelect={false}
                closeAfterSelected={true}
                getSelectedItems={item => setDraftData({...draftData, category: item.length > 0 ? item[0] : []})}
              />
            </div>
            <div className='new-post-categories-and-tags-subcategory'>
              <Selector
                items={
                  draftData.category.length === 0
                    ? subCategoriesList !== undefined && subCategoriesList.data
                    : subCategoriesByCategoryList !== undefined && subCategoriesByCategoryList.data[1]
                }
                alreadySelected={draftData.subCategory.label && draftData.subCategory.value && [draftData.subCategory]}
                label={'Sous-catégorie'}
                creatable={false}
                multiSelect={false}
                closeAfterSelected={true}
                getSelectedItems={item => setDraftData({...draftData, subCategory: item.length > 0 ? item[0] : []})}
              />
            </div>
            <div className='new-post-categories-and-tags-tags'>
              <Selector
                items={tagsList !== undefined && tagsList.data}
                alreadySelected={draftData.tags}
                label={'Tags'}
                creatable={true}
                created={newTag => newTagCreated(newTag)}
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
              : `Glissez déposez ou cliquez pour ${draftData.banner === '' ? 'ajouter une' : 'changer de'} bannière.`
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
          <TagCreationPopupComponent
            display={newTagPopup}
            text={newTagText.current}
            imageIndex={2}
            submit={tagText => saveCreatedTag(tagText)}
            dismiss={tagText => dismissCreatedTag(tagText)}
          />
          <div ref={confirmationPopup} className='new-post-save-confirmation'>
            <div className='new-post-save-confirmation-container'>
              <p>Votre brouillon a bien été sauvegardé !</p>
            </div>
          </div>
          <div ref={publishPopup} className='new-post-publish-confirmation'>
            <div className='new-post-publish-confirmation-container'>
              {draftData.title !== '' && draftData.content !== '' && Object.keys(draftData.subCategory).length !== 0 && sendArticleError !== true &&
                <>
                  <p>Votre article est prêt ? Publiez-le !</p>
                  <div className='new-post-publish-confirmation-container-actions'>
                    <button onClick={() => handlePublishPopup('close')}>Annuler</button>
                    <button onClick={() => send('published')}>Publier</button>
                  </div>
                </>
              }
              {(draftData.title === '' || draftData.content === '' || Object.keys(draftData.subCategory).length === 0) &&
                <>
                  {draftData.title === '' && <p>Il manque un titre à votre article !</p>}
                  {draftData.content === '' && <p>Vous n&apos;avez tapé aucun texte !</p>}
                  {Object.keys(draftData.subCategory).length === 0 && <p>Vous devez sélectionner une sous catégorie !</p>}
                  <div className='new-post-publish-confirmation-container-actions'>
                    <button onClick={() => handlePublishPopup('close')}>Ok compris !</button>
                  </div>
                </>
              }
              {sendArticleError === true && 
                <>
                  <p>Mince ! Une erreur s&apos;est produite ! Pas grave, je réessaierai plus tard...</p>
                  <div className='new-post-publish-confirmation-container-actions'>
                    <button onClick={() => handlePublishPopup('close')}>Ok compris !</button>
                  </div>
                </>
              }
            </div>
          </div>
          {sendArticleLoading && 
            <div className='new-post-loader'>
              <LoaderComponent />
            </div>
          }
        </div>
      }
    </>
  );
}

export default NewPost;
