import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './carouselcontainer.scss';
import { useGetArticlesQuery } from '../../data/articles';

function CarouselContainer() {
    const { data: articles, loading: articlesLoading, error: articlesError } = useGetArticlesQuery();

    return (
        <div className="swiper">
            <Swiper
            slidesPerView={4}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            loop={true}
            spaceBetween={30}
            freeMode={true}
            pagination={{
            clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
            >
        {articlesLoading ? (<h1>Loading...</h1>) : articlesError ? ( <h1>Error...</h1>) : (
            articles?.data.map((article) => (
            <SwiperSlide key={article.id}>
                
                <p className='author-carousel'>{article.subtitle}</p>
                <h2>{article.title}</h2>
                <img src={article.banner} alt={article.title} /> 
            </SwiperSlide>
         )))} 
            </Swiper>
        </div>
)
}

export default CarouselContainer;