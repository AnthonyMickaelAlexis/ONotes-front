import React, { useEffect, useRef, useState } from "react";
import "./articles.scss";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import { useNavigate } from "react-router-dom";
import TagComponent from "../../components/TagComponent";
import startAnimation from "../../utils/fallingTags";
import { formatIsoDate } from "../../utils/date";
import InfiniteScroll from "react-infinite-scroll-component";
import LoaderComponent from "../../components/LoaderComponent";
import axios from "axios";
import { useGetTagsHomepageQuery } from "../../data/tags";
import env from "react-dotenv";

function ArticlesPage() {
    const [page, setPage] = useState(1);
    // const { data: articlesResult } = useGetArticlesQuery({page: page});
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchFirst = async () => {
        setIsLoading(true);
        axios.get(`${env.API_URL}articles?page=${page}`)
        .then((response) => {
            setArticles(response.data.data.data);
            setPage(page + 1);
            setIsLoading(false);
        })
        .catch((error) => {
            if (error) {
                alert('Une erreur est survenue, veuillez réessayer plus tard');
            }
            setIsLoading(false);
        })
    }
    const fetchMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            axios.get(`${env.API_URL}articles?page=${page}`)
            .then((response) => {
                setArticles((articles) => [...articles, ...response.data.data.data]);
                response.data.data.data.length > 0 ? setHasMore(true) : setHasMore(false);
                setPage(page + 1);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error) {
                    alert('Une erreur est survenue, veuillez réessayer plus tard');
                }
                setIsLoading(false);
            })
        }, 1500);
    }
    
    const navigate = useNavigate();
    const canvas = useRef();
 


    
    const {data: tags } = useGetTagsHomepageQuery();
    const fallingTags =
    tags && tags.data
    ? tags.data.map((tag, index) => ({
            id: tag.id,
            key: index,
            icon: tag.logo,
            text: tag.name,
            textColor: tag.color,
            bgColor: tag.bg_color,
        }))
        : [];

  useEffect(() => {
      if (fallingTags.length > 0) {
          startAnimation(canvas.current);
          }
        fetchFirst();
  }, [])

  return (
      <div className="articles-view">
        <NavigationMenuComponent />
        <section className="articles-view_container">
            <h2>Tous les articles</h2>
            <ul id="scrollableDiv" className="articles-view_container--list">
                {isLoading && <LoaderComponent />}
                    <InfiniteScroll
                        dataLength={articles?.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<LoaderComponent />}
                        scrollableTarget="scrollableDiv"
                    >
                    {articles?.map((article) => (
                            <li className="articles-view_container--list_item" key={article.id} 
                                onClick={() => {
                                    navigate(`/article/${article.id}`)
                                }}>
                                <img src={`${article.banner}`} />
                                <div className="articles-view_container--list_content">
                                    <h3>{article.title}<span> par {article.user.pseudo}</span></h3>
                                    <h4>{article.subtitle}</h4>
                                    <p className="articles-view_container--list_content-text">{article.text_content.length >= 100 ? article.text_content.substring(0,100) + '...' : article.text_content}</p>
                                    <p className="articles-view_container--list_content-date">{formatIsoDate(article.updated_at)}</p>
                                </div>
                            </li>
                    ))}
                    </InfiniteScroll>
            </ul>
        </section>
        <section className="articles-view_container-tags" ref={canvas}>
            <h2>TOP TAGS</h2>
            {fallingTags ? (
            fallingTags.map((tagElement) => (
                <TagComponent
                key={`tag${tagElement.key}`}
                id={tagElement.id}
                icon={tagElement.icon}
                text={tagElement.text}
                textColor={tagElement.textColor}
                bgColor={tagElement.bgColor}
                position={"absolute"}
                />
            ))
            ) : (
            <div>not found</div>
            )}
        </section>
    </div>
  );
}

export default ArticlesPage;
