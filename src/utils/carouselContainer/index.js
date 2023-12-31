import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./carouselcontainer.scss";
import { useGetArticlesQuery } from "../../data/articles";
import { formatIsoDate } from "../../utils/date";
import { useNavigate } from "react-router";

function CarouselContainer() {
  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticlesQuery({ page: 1 });
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [showPagination, setShowPagination] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setSlidesPerView(2);
        setShowPagination(false);
      } else if (window.innerWidth <= 900) {
        setSlidesPerView(3);
        setShowPagination(false);
      } else if (window.innerWidth <= 1200) {
        setSlidesPerView(4);
        setShowPagination(false);
      } else {
        setSlidesPerView(5);
        setShowPagination(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="swiper">
      <Swiper
        slidesPerView={slidesPerView}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={30}
        freeMode={true}
        pagination={showPagination ? { clickable: true } : false}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper"
      >
        {articlesLoading ? (
          <h1>Loading...</h1>
        ) : articlesError ? (
          <h1>Error...</h1>
        ) : (
          articles?.data.data.map((article) => (
            <SwiperSlide key={article.id}onClick={() => navigate(`article/${article.id}`)}>
              <div className="author-date-line">
                <p className="author-carousel">{article.user.pseudo ? article.user.pseudo : `${article.user.firstname} ${article.user.lastname}`}</p>
                <p className="date-carousel">
                  {formatIsoDate(article.created_at) || "Date not found"}
                </p>
              </div>
              <h2 className={article.banner ? "" : "title-without-image"}>{article.title}</h2>
              {article.banner && <img src={article.banner} alt={article.title} />}
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default CarouselContainer;
