import React, { useEffect, useRef } from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import "./categoriespage.scss";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import TagComponent from "../../components/TagComponent";
import startAnimation from "../../utils/fallingTags";
import { useGetCategoriesQuery } from "../../data/categories";
import { useGetArticlesQuery } from "../../data/articles";
import { useNavigate } from "react-router-dom";
import { formatIsoDate } from "../../utils/date";
import PropTypes from 'prop-types';
import { useGetTagsHomepageQuery } from "../../data/tags";

function CategoriesPage({ isLogged }) {
    const canvas = useRef();
    const navigate = useNavigate();

    const {data: categories} = useGetCategoriesQuery();
    const {data: articles } = useGetArticlesQuery(1);
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
    }, [fallingTags])

    return (
        <div className="categories-view">
            <NavigationMenuComponent/>
            <section className="categories-container">
                <h2>CATEGORIES</h2>
                <article className="categories-container_categories">
                    {categories && categories?.data.map(category => (
                        <CategoryCardComponent
                            key={category.id}
                            id={category.id}
                            banner={category.banner}
                            bannerBoolean={true}
                            title={category.name}
                            subTitle={category.subtitle}
                            bgColor="#5B6CFF"
                        />
                    ))}
                </article>
                <h2>ARTICLES
                    <button onClick={() => navigate('/articles')}>
                        Tous les articles
                    </button>
                </h2>
                <article className="categories-container_articles">
                    <ul className="categories-container_articles--list">
                    {articles && articles?.data.data.map(article =>
                        <li style={{padding: '0.5rem', cursor: 'pointer'}}
                            key={article.id} 
                            onClick={() => {
                                navigate(`/article/${article.id}`) 
                        }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: '#ccc'
                            }}>
                            <img src={article.user.avatar} 
                                style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '1px solid #ccc',
                                backgroundColor: '#ccc'
                                }} 
                            />
                        </div>
                            <h3>{article.title.length >= 10 ? article.title.substring(0,10) + '...' : article.title}</h3>
                            <p>{article.subtitle} <span>Le {formatIsoDate(article.updated_at)}</span></p>
                        </li>
                    )}
                    </ul>
                </article>
            </section>
            <section className="categories-right">
                <article ref={canvas} className="categories-right--tags">
                    <h2>TOP TAGS</h2>
                    {fallingTags && fallingTags?.map(tagElement =>
                        <TagComponent
                            key={`tag${tagElement.key}`}
                            id={tagElement.id}
                            icon={tagElement.icon}
                            text={tagElement.text}
                            textColor={tagElement.textColor}
                            bgColor={tagElement.bgColor}
                            position={"absolute"}
                        />
                    )}
                </article>
                <article className="categories-right--write">
                    <h2>Inspiré pour écrire un article ?</h2>
                    {isLogged && (
                        <button onClick={() => navigate('/new-post')}>Créer un article</button>
                    )}
                    {!isLogged && (
                        <button onClick={() => navigate('/authentication')}>Se connecter</button>
                    )}
                </article>
            </section>
        </div>
    );
}

CategoriesPage.propTypes = {
    isLogged: PropTypes.bool
}

export default CategoriesPage;
