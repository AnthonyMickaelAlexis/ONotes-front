import React from 'react';
import './homepage.scss';
import { Link } from "react-router-dom"
import 'swiper/css';
import 'swiper/css/pagination';
import CarouselContainer from '../../utils/carouselContainer';


function Homepage() {
  
  return (
    <div className="homepage">
      <Link to="/authentication">
        Auth
      </Link>
      {/* HEADER */}
      <div>logo</div>
      <div> login button</div>
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
  );
}

export default Homepage;