import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './carouselcontainer.scss';
import { useArticleQuery } from "../../../data/articles";

function CarouselContainer() {
    const { data: articles, isError, isLoading } = useArticleQuery({ id: 'tonId' });
    
    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (isError) {
        return <p>Erreur lors de la récupération des articles</p>;
    }

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
                {articles.map((article) => (
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