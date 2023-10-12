import React, { useEffect, useRef } from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import './categoriespage.scss';
import CategoryCardComponent from "../../components/CategoryCardComponent";
import TagComponent from "../../components/TagComponent";
import startAnimation from '../../utils/fallingTags';
import Icon from '../../assets/images/logo192.png';



function CategoriesPage() {

    const canvas = useRef();
    useEffect(() => {
        startAnimation(canvas.current);
    }, [])
    
    const categories = [
        {
            id: 1,
            title: 'Category 1',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#5B6CFF'
        },
        {
            id: 2,
            title: 'Category 2',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#FF5B5B'
        },
        {
            id: 3,
            title: 'Category 3',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#5BFF5B'
        },
        {
            id: 4,
            title: 'Category 4',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#FF5BFF'
        },
        {
            id: 5,
            title: 'Category 5',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#5B6CFF'
        },
        {
            id: 6,
            title: 'Category 6',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#FF5B5B'
        },
        {
            id: 7,
            title: 'Category 7',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#5BFF5B'
        },
        {
            id: 8,
            title: 'Category 8',
            subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
            banner: 'https://picsum.photos/200/300',
            bgColor: '#FF5BFF'
        }
    ];

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
                    {categories.map(category => (
                        <CategoryCardComponent
                            key={category.id}
                            id={category.id}
                            banner={category.banner}
                            title={category.title}
                            subTitle={category.subTitle}
                            bgColor={category.bgColor} 
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