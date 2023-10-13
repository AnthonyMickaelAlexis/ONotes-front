import React, { useEffect, useRef } from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import './categoriespage.scss';
import CategoryCardComponent from "../../components/CategoryCardComponent";
import TagComponent from "../../components/TagComponent";
import startAnimation from '../../utils/fallingTags';
import Icon from '../../assets/images/logo192.png';
import { useGetCategoriesQuery } from "../../data/categories";

function CategoriesPage() {
    const canvas = useRef();

    const {data} = useGetCategoriesQuery();

    console.log(data);
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
                <h2>CATEGORIES</h2>
                <article className="categories-container_categories">
                    {data && data?.data.map(category => (
                        <CategoryCardComponent
                            key={category.id}
                            id={category.id}
                            banner={category.banner}
                            title={category.name}
                            subTitle={category.subTitle}
                            bgColor="#5B6CFF"
                        />
                    ))}
                </article>
                <article className="categories-container_articles">
                    <h2>ARTICLES</h2>
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

export default CategoriesPage;