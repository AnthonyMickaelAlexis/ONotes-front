import React, { useEffect, useRef } from "react";
import "./articles.scss";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import { useGetArticlesQuery } from "../../data/articles";
import { useNavigate } from "react-router-dom";
import TagComponent from "../../components/TagComponent";
import startAnimation from "../../utils/fallingTags";
import Icon from '../../assets/images/logo192.png';
import { formatIsoDate } from "../../utils/date";

function ArticlesPage() {
//   const { id } = useParams();
  const {
    data: articles,
    loading: articlesLoading,
    error: articlesError,
  } = useGetArticlesQuery();
  const navigate = useNavigate();
  const canvas = useRef();

  if (articlesLoading) return <h2>Loading...</h2>;
  if (articlesError) return <h2>Error...</h2>;


  useEffect(() => {
      startAnimation(canvas.current);
  }, [])
  
  const fallingTags = [
      {key: 0, icon: Icon, text: 'React', textColor: 'white', bgColor: 'blue'},
      {key: 1, icon: Icon, text: 'React', textColor: 'white', bgColor: 'red'},
      {key: 2, icon: Icon, text: 'React', textColor: 'white', bgColor: 'green'},
      {key: 3, icon: Icon, text: 'React', textColor: 'white', bgColor: 'black'},
      {key: 4, icon: Icon, text: 'React', textColor: 'white', bgColor: 'purple'},
    ]

  return (
    <div className="articles-view">
        <NavigationMenuComponent />
        <section className="articles-view_container">
            <h2>Tous les articles</h2>
            <ul className="articles-view_container--list">
                {articles && articles?.data.map((article) => (
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
            </ul>
        </section>
        <section className="articles-view_container-tags" ref={canvas}>
            <h2>TOP TAGS</h2>
            {fallingTags && fallingTags.map(tagElement =>
                <TagComponent key={`tag${tagElement.key}`} icon={tagElement.icon} text={tagElement.text} textColor={tagElement.textColor} bgColor={tagElement.bgColor} position={'absolute'} />
            )}
        </section>
    </div>
  );
}

export default ArticlesPage;
