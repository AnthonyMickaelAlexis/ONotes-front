/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import "./subcategoriespage.scss";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import { useGetSubcategoryQuery } from "../../data/subcategories";
import { useGetHomePageArticlesQuery } from "../../data/articles";
import { useNavigate } from "react-router-dom";

function SubcategoriesPage() {
  const { id } = useParams();
  const { data: subcategories } = useGetSubcategoryQuery(id);

  const navigate = useNavigate();

  const { data: articles } = useGetHomePageArticlesQuery();

  return (
    <div className="categories-view">
      <NavigationMenuComponent />
      <section className="categories-container">
        <h2>SUBCATEGORIES {subcategories?.data[0].name.toUpperCase()}</h2>

        <article className="categories-container_categories">
          {subcategories?.data[1].map((subcategory) => (
            <CategoryCardComponent
              key={subcategory.id}
              id={subcategory.id}
              bannerBoolean={false}
              title={subcategory.name}
              bgColor="#5B6CFF"
              categoryBoolean={false}
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
        <article className="categories-right--tags">
          <h2>TOP TAGS</h2>
        </article>
        <article className="categories-right--write">
          <h2>WRITE AN ARTICLE</h2>
        </article>
      </section>
    </div>
  );
}

export default SubcategoriesPage;
