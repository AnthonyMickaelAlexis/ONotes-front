import React, { useEffect, useRef, Fragment } from 'react';
import './homepage.scss';
import Tag from '../../components/TagComponent';
import Icon from '../../assets/images/logo192.png';
import startAnimation from '../../utils/fallingTags';
import 'swiper/css';
import 'swiper/css/pagination';
import CarouselContainer from '../../utils/carouselContainer';
import Box from '../../utils/boxHomePageContainer';
import ArrowRight from '../../assets/images/arrow-right.svg';
import NavigationButtonComponent from '../../components/NavigationButtonComponent';
import { ModifyHalo } from '../../utils/haloModifier';


function Homepage() {
    
  const fallingTags = [
    {key: 0, icon: Icon, text: 'React', textColor: 'white', bgColor: 'blue'},
    {key: 1, icon: Icon, text: 'React', textColor: 'white', bgColor: 'red'},
    {key: 2, icon: Icon, text: 'React', textColor: 'white', bgColor: 'green'},
    {key: 3, icon: Icon, text: 'React', textColor: 'white', bgColor: 'black'},
    {key: 4, icon: Icon, text: 'React', textColor: 'white', bgColor: 'purple'},
  ]

  const canvas = useRef();
  const halo1 = useRef();
  const halo2 = useRef();
  const halo3 = useRef();
  let halo1Obj, halo2Obj, halo3Obj;
  useEffect(() => {
    startAnimation(canvas.current);
    halo1Obj = new ModifyHalo(halo1.current);
    halo1Obj.start();
    halo2Obj = new ModifyHalo(halo2.current);
    setTimeout(() => {
      halo2Obj.start();
    }, 1000);
    halo3Obj = new ModifyHalo(halo3.current);
    setTimeout(() => {
      halo3Obj.start();
    }, 2000);

    return () => {
      halo1Obj.stop();
      halo2Obj.stop();
      halo3Obj.stop();
    }
  }, [])

  return (
    <Fragment>
    <div className="homepage">
      <div ref={halo1} className='homepage-halo1'></div>
      <div ref={halo2} className='homepage-halo2'></div>
      <div ref={halo3} className='homepage-halo3'></div>
      {fallingTags.map(tagElement =>
        <Tag key={`tag${tagElement.key}`} icon={tagElement.icon} text={tagElement.text} textColor={tagElement.textColor} bgColor={tagElement.bgColor} />
      )}
      <div ref={canvas} className='homepage-falling-tags-canvas'></div>
      {/* HEADER */}

      {/* HEADER END */}
      <section className='homepage-title-and-cta'>
        <h1>Une application pour tout savoir sur tout !</h1>
        <p>O&apos;Notes est une plateforme dynamique conçue pour les étudiants passionnés par l&apos;apprentissage collaboratif et la maîtrise des technologies.</p>
        <NavigationButtonComponent text='DECOUVRIR' icon={ArrowRight} textColor='white' bgColor='black' link='/authentication' />
      </section>
      <section className='homepage-part-2'>
        <div className='homepage-part-2-title'>
          <h2>Un espace où les octets se métamorphosent en neurones !</h2>
        </div>
        <CarouselContainer />
        <div className='homepage-part-2-stats'>
          <div>Des chiffres qui font parler...</div>
          <div className='homepage-part-2-stats-single'>
            <p>99%</p>
            <p>de sujets résolus</p>
          </div>
          <div className='homepage-part-2-stats-single'>
            <p>12K</p>
            <p>utilisateurs</p>
          </div>
          <div className='homepage-part-2-stats-single'>
            <p>+100</p>
            <p>tags et catégories</p>
          </div>
        </div>
      </section>
        
        <Box />

        {/* FOOTER */}
        </div>
        {/* FOOTER */}
        </Fragment>
  );
}

export default Homepage;