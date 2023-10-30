import React, { useEffect, useRef } from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import './subcategoriespage.scss';
import CategoryCardComponent from "../../components/CategoryCardComponent";
import TagComponent from "../../components/TagComponent";
import startAnimation from '../../utils/fallingTags';
import Icon from '../../assets/images/logo192.png';
import { useGetSubcategoriesQuery } from "../../data/subcategories";
import { useGetHomePageArticlesQuery } from "../../data/articles";
import { useNavigate } from "react-router-dom";

function SubcategoriesPage() {
    const canvas = useRef();
    const navigate = useNavigate();

    const {data: subcategories} = useGetSubcategoriesQuery();
    const {data: articles } = useGetHomePageArticlesQuery();

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
        <div className="categories-view">
            <NavigationMenuComponent/>
            <section className="categories-container">
                <h2>SUBCATEGORIES</h2>
                <article className="categories-container_categories">
                    {subcategories && subcategories?.data.map(subcategory => (
                        <CategoryCardComponent
                            key={subcategory.id}
                            id={subcategory.id}
                            bannerBoolean={false}
                            title={subcategory.name}
                            bgColor="#5B6CFF"
                        />
                    ))}
                </article>
                <h2>ARTICLES</h2>
                <article className="categories-container_articles">
                    {articles && articles?.data.map(article =>
                        <div className='profile-view--articles_container__article' 
                            style={{padding: '0.5rem', cursor: 'pointer'}}
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
                            <h3>{article.title}</h3>
                            <p>{article.subtitle} <span>{article.updated_at}</span></p>
                        </div>
                    )}
                </article>
            </section>
            <section className="categories-right">
                <article ref={canvas} className="categories-right--tags">
                    <h2>TOP TAGS</h2>
                    {fallingTags && fallingTags.map(tagElement =>
                        <TagComponent key={`tag${tagElement.key}`} icon={tagElement.icon} text={tagElement.text} textColor={tagElement.textColor} bgColor={tagElement.bgColor} position={'absolute'} />
                    )}
                </article>
                <article className="categories-right--write">
                    <h2>WRITE AN ARTICLE</h2>
                </article>
            </section>
        </div>
    );
}

export default SubcategoriesPage;