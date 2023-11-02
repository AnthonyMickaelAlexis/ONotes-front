import React, { useEffect, useRef, useState } from "react";
import "./articles.scss";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
// import { useGetArticlesQuery } from "../../data/articles";
import { useNavigate } from "react-router-dom";
import TagComponent from "../../components/TagComponent";
import startAnimation from "../../utils/fallingTags";
// import Icon from '../../assets/images/logo192.png';
import { formatIsoDate } from "../../utils/date";
import InfiniteScroll from "react-infinite-scroll-component";
import LoaderComponent from "../../components/LoaderComponent";
import axios from "axios";
import { useGetTagsHomepageQuery } from "../../data/tags";

function ArticlesPage() {
    const [page, setPage] = useState(1);
    // const { data: articlesResult } = useGetArticlesQuery({page: page});
    const [articles, setArticles] = useState([]);

    const fetchFirst = async () => {
        axios.get(`https://kin-onotes-back.rover.ingeeniex.com/api/articles?page=${page}`)
        .then((response) => {
            setArticles(response.data.data.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const fetchMore = () => {
        setPage(page + 1);
        axios.get(`https://kin-onotes-back.rover.ingeeniex.com/api/articles?page=${page}`)
        .then((response) => {
            setArticles((articles) => [...articles, ...response.data.data.data]);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const navigate = useNavigate();
    const canvas = useRef();
 


  useEffect(() => {
        fetchFirst();
        startAnimation(canvas.current);
  }, [])
  
  const {data: fallingTags, isLoading } = useGetTagsHomepageQuery();

  return (
    <div className="articles-view">
        <NavigationMenuComponent />
        <section className="articles-view_container">
            <h2>Tous les articles</h2>
            <ul className="articles-view_container--list">
                {articles && (
                    <InfiniteScroll
                        dataLength={articles?.length}
                        next={fetchMore}
                        hasMore={true}
                        loader={<LoaderComponent />}
                    >
                    {articles?.map((article) => (
                            <li className="articles-view_container--list_item" key={article.id} 
                                onClick={() => {
                                    navigate(`/article/${article.id}`)
                                }}>
                                <img src={article.banner} />
                                <div className="articles-view_container--list_content">
                                    <h3>{article.title}<span> par {article.user.pseudo}</span></h3>
                                    <h4>{article.subtitle}</h4>
                                    <p className="articles-view_container--list_content-text">{article.text_content.length >= 100 ? article.text_content.substring(0,100) + '...' : article.text_content}</p>
                                    <p className="articles-view_container--list_content-date">{formatIsoDate(article.updated_at)}</p>
                                </div>
                            </li>
                    ))}
                    </InfiniteScroll>
                )}
            </ul>
        </section>
        <section className="articles-view_container-tags" ref={canvas}>
            <h2>TOP TAGS</h2>
            {isLoading && <LoaderComponent />}
            {fallingTags?.data && fallingTags?.data.map(tagElement =>
                <TagComponent key={`tag${tagElement.id}`} icon={tagElement.logo} text={tagElement.name} textColor={tagElement.color} bgColor={tagElement.bg_color} position={'absolute'} />
            )}
        </section>
    </div>
  );
}

export default ArticlesPage;
