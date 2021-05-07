import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination';
import React from 'react';

import s from './ArticleList.module.scss'

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        Здесь пусто...пока что.
      </div>
    );
  }

  return (
    <div>
    <ul className = {s.list}>
      {
        props.articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }
    </ul>
      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ArticleList;
