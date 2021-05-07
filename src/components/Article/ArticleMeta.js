import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './article.module.css';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <>
      <div className={styles.banner__userdata}>
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className={styles.userdata__info}>
          <Link to={`/@${article.author.username}`} className={styles.userdata__name}>
            {article.author.username}
          </Link>
          <span className={styles.userdata__date}>
            {new Date(article.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <ArticleActions canModify={props.canModify} article={article} />
    </>
  );
};

export default ArticleMeta;
