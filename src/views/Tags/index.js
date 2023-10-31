import React from "react";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import "./tagspage.scss";
import TagCardComponent from "../../components/TagCardComponent";
import { useGetTagsQuery } from "../../data/tags";
import { useGetHomePageArticlesQuery } from "../../data/articles";
import { useNavigate } from "react-router-dom";

function TagsPage() {
  const navigate = useNavigate();

  const { data: tags } = useGetTagsQuery();
  const { data: articles } = useGetHomePageArticlesQuery();

  return (
    <div className="tags-view">
      <NavigationMenuComponent />
      <section className="tags-container">
        <h2>TOUS LES TAGS</h2>
        <article className="tags-container_tags">
          {tags &&
            tags?.data.map((tag) => (
              <TagCardComponent key={tag.id} tag={tag} />
            ))}
        </article>
      </section>
      <section className="tags-right-articles-container">
        <article className="tags-container_articles">
          <h2>ARTICLES</h2>
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
    </div>
  );
}

export default TagsPage;
