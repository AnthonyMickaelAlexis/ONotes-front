/* eslint-disable */
import React from "react";
import { useParams } from "react-router-dom";
import NavigationMenuComponent from "../../components/NavigationMenuComponent";
import "./tagpage.scss";
import TagCardComponent from "../../components/TagCardComponent";
import { useGetTagQuery } from "../../data/tags";
import { useNavigate } from "react-router-dom";
import { formatIsoDate } from "../../utils/date";

function TagPage() {
  const { id } = useParams();
  const { data: response } = useGetTagQuery(id);

  const navigate = useNavigate();

  if (!response || !response.data || response.data.length === 0) {
    return <div>Loading...</div>;
  }

  const tagInfo = response.data[0];
  const articles = response.data[1];
  console.log("Tags:", tagInfo, "id", id);
  console.log("articles", articles);

  return (
    <div className="tag-view">
      <NavigationMenuComponent />
      <section className="tag-container">
        <h2>
          <TagCardComponent key={tagInfo.id} tag={tagInfo} />
        </h2>
        <article className="tag-container_articles">
          <h2>ARTICLES</h2>
          {articles ? (
            articles.map((article) => (
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
                </div>
                <h3>{article.title}</h3>
                <p>
                  {article.subtitle} <span>{formatIsoDate(article.updated_at)}</span>
                </p>
              </div>
            ))
          ) : (
            <div>No articles available.</div>
          )}
        </article>
      </section>
    </div>
  );
}

export default TagPage;
