import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import Heart from '../Heart/Heart'
import s from './ArticlePreview.module.scss'
const FAVORITED_CLASS = s.article__btn_unfavorite;
const NOT_FAVORITED_CLASS = s.article__btn_favorite;

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };
  
  return (
    <li className={s.article}>
    {article.photo && <div className = {s.article__photo}></div>}
      <div className = {s.article__post}>
        <div className = {s.article__header}>
        <div className={s.article__user}>
          <Link className = {s.article__avatar} to={`/@${article.author.username}`}>
              <img src={article.author.image} alt={article.author.username} />
          </Link>
            <div>
              <div className={s.article__text}>
              <Link className = {s.article__text_user} to={`/@${article.author.username}`}>
                {article.author.username}
              </Link>
              <span className = {s.article__text_date}>
                {
                  new Date(article.createdAt).toLocaleString([], {weekday:'short', day:'2-digit', month:'long', year:'numeric'})
                }
              </span>
              </div>
            </div>
        </div>
          <div>
            <button className={`${s.article__btn} ${favoriteButtonClass}`} onClick={handleClick}>
              {article.favoritesCount > 0 ? article.favoritesCount : null} <Heart />
            </button>
          </div>
        </div>
        <Link to={`/article/${article.slug}`} className={s.article__title}>
          <h2>{article.title}</h2>
        </Link>
          <p className ={s.article__descr}>{article.description}</p>
        <div className={s.article__footer}>
        <Link to = {`/article/${article.slug}`} className = {s.article__more}>Развернуть...</Link>
          <ul className={`tag-list ${s.article__tags}`}>
            {
              article.tagList.map(tag => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                )
              })
            }
          </ul>
        </div>
        </div>
    </li>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
