import React, { useEffect, useRef, Fragment } from 'react';
import './homepage.scss';
import { Link } from "react-router-dom";
import Tag from '../../components/TagComponent';
import Icon from '../../assets/images/logo192.png';
import startAnimation from '../../utils/fallingTags';
import 'swiper/css';
import 'swiper/css/pagination';
import CarouselContainer from '../../utils/carouselContainer';

function Homepage() {
    
  const fallingTags = [
    {key: 0, icon: Icon, text: 'React', textColor: 'white', bgColor: 'blue'},
    {key: 1, icon: Icon, text: 'React', textColor: 'white', bgColor: 'red'},
    {key: 2, icon: Icon, text: 'React', textColor: 'white', bgColor: 'green'},
    {key: 3, icon: Icon, text: 'React', textColor: 'white', bgColor: 'black'},
    {key: 4, icon: Icon, text: 'React', textColor: 'white', bgColor: 'purple'},
  ]

  const canvas = useRef();
  const alreadyStarted = useRef(false);
  useEffect(() => {
    if (alreadyStarted.current === false) {
      startAnimation(canvas.current);
    }
    alreadyStarted.current = true;
  }, [])

  return (
    <Fragment>
    <div className="homepage">
      {fallingTags.map(tagElement =>
        <Tag key={`tag${tagElement.key}`} icon={tagElement.icon} text={tagElement.text} textColor={tagElement.textColor} bgColor={tagElement.bgColor} />
      )}
      <div ref={canvas} className='home-falling-tags'></div>
      <Link to="/authentication">
        Auth
      </Link>
      {/* HEADER */}

      {/* HEADER END */}
      <div>title</div>
        <div>subtitle</div>
        <div>button discover</div>
        <div>components matterjs qui tombent</div>
        <div> titre au-dessus d&#39;article </div>
        {/* carousel */}
    
        <CarouselContainer />

{/* carousel end*/}
        <div> les chiffres qui font parler</div>
        
        <div> box autour de image communauté
        <div> component image</div>
        <div> component image</div>
        <div>on a même notre application</div>
        <div> component image</div>
        <div> logo playstore appstore</div>
        </div>

        {/* FOOTER */}
        <div>box du bas 
        <div> page equipe</div>
        <div> page mentions légales</div>
        <div> page cgu </div>
        </div>
        {/* FOOTER */}
        </div>
        </Fragment>
  );
}

export default Homepage;