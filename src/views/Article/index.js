import React from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import TagComponent from "../../components/TagComponent";
import { useGetArticleQuery } from "../../data/articles";
import { formatIsoDate } from "../../utils/date";
import "./article.scss";

function Article() {
  const { id } = useParams();
  const {
    data: article,
    loading: articleLoading,
    error: articleError,
  } = useGetArticleQuery(id);

  if (articleLoading) return <h2>Loading...</h2>;
  if (articleError) return <h2>Error...</h2>;

  const { title, subtitle, banner, resume, user, created_at, tag, text_content } =
    article?.data[0] || {};
  const category = article?.data[1][0].category.name;
  const subcategory = article?.data[1][0].name;

  return (
    <div className="article-view">
      <NavigationMenuComponent />
      <div className="article-view-title-and-subtitle">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
      {banner &&
        <img className="article-view-banner" src={banner} alt="Bannière" />
      }
      <div className="article-view-container">
        {resume &&
          <div className="article-view-resume">{resume}</div>
        }
        <div className={`article-view-header ${!resume ? 'article-view-header-with-radius' : ''}`}>
          {category && subcategory &&
            <p className="article-view-header-categories">
              {category} / {subcategory}
            </p>
          }
          <div className="article-view-header-author-date">
            <p className="article-view-header-author">
              Par <span>{user?.pseudo || `${user?.firstname} ${user?.lastname}`}</span>
              {user?.avatar && <div><img src={user?.avatar} /></div>}
            </p>
            <p className="article-view-header-date">
              Le {formatIsoDate(created_at)}
            </p>
          </div>
          <div className="article-view-header-tags">
            {tag?.map((tg, index) => 
              <TagComponent
                key={`tag-${index}`}
                id={tg.id}
                icon={tg.logo}
                text={tg.name}
                textColor={tg.color}
                bgColor={tg.bg_color}
              />
            )}
          </div>
        </div>
        <div className="article-view-editor">
          <ReactQuill theme="snow" modules={{ toolbar: false }} readOnly="true" value={text_content} />
        </div>
      </div>
    </div>
  );
}

export default Article;
