import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './carouselcontainer.scss';
// import { useSelector } from 'react-redux';
import { useGetArticlesQuery } from '../../data/articles';

function CarouselContainer() {
    const { data: articles } = useGetArticlesQuery();
console.log(useGetArticlesQuery())
    // const articles = useSelector(state => state.articles);

    return (
        <div className="swiper">
            <Swiper
            slidesPerView={3}
            autoplay={3000}
            loop={true}
            spaceBetween={30}
            freeMode={true}
            pagination={{
            clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
            >
                        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
        {articles?.map((article) => (
            <SwiperSlide key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.subtitle}</p>
                <img src={article.banner} alt={article.title} /> 
            </SwiperSlide>
         ))} 
            </Swiper>
        </div>
)
}

export default CarouselContainer;