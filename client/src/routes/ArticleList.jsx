import React from 'react';

import Article from '../components/Article';

const fakeArticle = {
  header: 'Article Header',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat in tortor sem erat nunc. Nascetur tortor, vitae massa nunc vulputate suscipit vel, ut. Orci auctor penatibus justo, inv. Massa tortor nisl faucibus aliquam ut nibh feugiat lobortis arcu.',
};
let articles = new Array(3).fill({ ...fakeArticle });

function ArticleList() {
  return (
    <>
      {articles.map((article, i) => (
        <Article key={i} {...article} />
      ))}
    </>
  );
}

export default ArticleList;
