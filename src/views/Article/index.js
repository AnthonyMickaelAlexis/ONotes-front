import React from 'react';
import './article.scss';
import { useParams } from 'react-router-dom';
import { useGetArticleQuery } from "../../data/articles";

function Article() {
    const { id } = useParams();
    const { data: article, loading: articleLoading, error: articleError } = useGetArticleQuery(id);
    console.log(article)

  return (
    <div>
        <h1>Article title</h1>
            <div className='article-banner'>
            </div>
                <div className='article-tag'>
                </div>
                <div className='article-header'>
                </div>
                <div className='article-author-date'>
                    <div className='article-author'>
                    </div>
                    <div className='article-date'>
                    </div>
                </div>
            <div className='article-text-content'>
                {articleLoading ? (<h1>Loading...</h1>) : articleError ? ( <h1>Error...</h1>) : article?.data.text_content ? (article.data.text_content) : (<h1>Article not found</h1>)}
            </div>
    </div>
  );
}

export default Article;