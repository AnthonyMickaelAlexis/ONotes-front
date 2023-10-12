import React from "react";
import "./article.scss";
import { useParams } from "react-router-dom";
import { useGetArticleQuery } from "../../data/articles";
import { formatIsoDate } from "../../utils/date";

function Article() {
  const { id } = useParams();
  const {
    data: article,
    loading: articleLoading,
    error: articleError,
  } = useGetArticleQuery(id);

  if (articleLoading) return <h2>Loading...</h2>;
  if (articleError) return <h2>Error...</h2>;

  const { title, banner, author, created_at, text_content } =
    article?.data || {};

  return (
    <div>
      <div className="article-title">{title || "Article title not found"}</div>
      <div className="article-banner">
        <img src={banner} alt="Banner" className="banner" />
      </div>
      <div className="article-container">
        <div className="article-header">
          <div className="article-tag">
            <div>TODO article tag</div>
          </div>
        </div>
        <div className="article-author-date">
          <div className="article-author">{author || "TODO author"}</div>
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
