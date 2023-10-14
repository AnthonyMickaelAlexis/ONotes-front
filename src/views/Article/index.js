import React from "react";
import "./article.scss";
import { useParams } from "react-router-dom";
import { useGetArticleQuery } from "../../data/articles";
import { formatIsoDate } from "../../utils/date";
import TagComponent from "../../components/TagComponent";

function Article() {
  const { id } = useParams();
  const {
    data: article,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticleQuery(id);

  article?.data.tag.map((tg) => console.log(tg.name));

  const { title, banner, user, created_at, text_content } = article?.data || {};

  return (
    <div>
      <div className="article-title">{title || "Article title not found"}</div>
      <div className="article-banner">
        <img src={banner} alt="Banner" className="article-banner-img" />
      </div>
      <div className="article-container">
        <div className="article-header">
        </div>
        <div className="article-author-date">
          <div className="article-author">{user?.pseudo || "TODO author"}</div>
          <div className="article-tag">
            {articlesLoading ? (
              <h1>Loading...</h1>
            ) : articlesError ? (
              <h1>Error...</h1>
            ) : (
              article?.data.tag.map((tg) => {
                return (
                  <TagComponent
                    key={tg.id}
                    text={tg.name}
                    icon={tg.logo}
                    bgColor={tg.color}
                  />
                );
              })
            )}
          </div>
          <div className="article-date">
            {formatIsoDate(created_at) || "Date not found"}
          </div>
        </div>
        <div className="article-text-content">
          {text_content || "Article not found"}
        </div>
      </div>
    </div>
  );
}

export default Article;
