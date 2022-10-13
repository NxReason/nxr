import React from 'react';
import './Article.css';

function Article({ header, content }) {
  return (
    <article className="article">
      <img
        src="https://api.lorem.space/image?w=350&h=220"
        alt="article img"
        className="article-img"
      />
      <div className="article-desc">
        <h1 className="article-title">{header}</h1>
        <p className="article-content">{content}</p>
      </div>
    </article>
  );
}

export default Article;
