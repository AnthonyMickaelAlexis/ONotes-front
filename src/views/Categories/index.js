import React, { useEffect, useRef } from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import "./categoriespage.scss";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import TagComponent from "../../components/TagComponent";
import startAnimation from "../../utils/fallingTags";
import { useGetCategoriesQuery } from "../../data/categories";
import { useGetHomePageArticlesQuery } from "../../data/articles";
import { useGetTagsHomepageQuery } from "../../data/tags";
import { useNavigate } from "react-router-dom";

function CategoriesPage() {
  const canvas = useRef();
  const navigate = useNavigate();

  const { data: categories } = useGetCategoriesQuery();
  const { data: articles } = useGetHomePageArticlesQuery();
  const { data: tags } = useGetTagsHomepageQuery();

  useEffect(() => {
    startAnimation(canvas.current);
  }, []);

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
  }, [fallingTags]);
  return (
    <div className="categories-view">
      <NavigationMenuComponent />
      <section className="categories-container">
        <h2>CATEGORIES</h2>
        <article className="categories-container_categories">
          {categories &&
            categories?.data.map((category) => (
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
        <h2>ARTICLES</h2>
        <article className="categories-container_articles">
          {articles &&
            articles?.data.map((article) => (
              <div
                className="profile-view--articles_container__article"
                style={{ padding: "0.5rem", cursor: "pointer" }}
                key={article.id}
                onClick={() => {
                  navigate(`/article/${article.id}`);
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                  }}
                >
                  <img
                    src={article.user.avatar}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      backgroundColor: "#ccc",
                    }}
                  />
                </div>
                <h3>{article.title}</h3>
                <p>
                  {article.subtitle} <span>{article.updated_at}</span>
                </p>
              </div>
            ))}
        </article>
      </section>
      <section className="categories-right">
        <article ref={canvas} className="categories-right--tags">
          <h2>TOP TAGS</h2>
          {fallingTags &&
            fallingTags.map((tagElement) => (
              <TagComponent
                key={`tag${tagElement.key}`}
                icon={tagElement.icon}
                text={tagElement.text}
                textColor={tagElement.textColor}
                bgColor={tagElement.bgColor}
                position={"absolute"}
              />
            ))}
        </article>
        <article className="categories-right--write">
          <h2>WRITE AN ARTICLE</h2>
        </article>
      </section>
    </div>
  );
}

export default CategoriesPage;
