import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
// import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../slices/articleList';
import Heart from '../Heart/Heart';
import s from './ArticlePreview.module.scss';
const FAVORITED_CLASS = s.article__btn_unfavorite;
const NOT_FAVORITED_CLASS = s.article__btn_favorite;
import Tags from '../Tags/Tags';
import UserMeta from '../UserMeta/UserMeta';

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug),
    }),
});

const ArticlePreview = (props) => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };
  const [disabled, setDisabled] = React.useState(true);
  React.useEffect(() => {
    if (props.token !== null) {
      setDisabled(false);
    }
  });

  return (
    <li className={s.article}>
      {article.photo && <div className={s.article__photo}></div>}
      <div className={s.article__post}>
        <div className={s.article__header}>
          <UserMeta section='article' article={props.article} />
          <div>
            <button className={`${s.article__btn} ${favoriteButtonClass}`} onClick={handleClick} disabled={disabled}>
              {article.favoritesCount > 0 ? article.favoritesCount : null} <Heart />
            </button>
          </div>
        </div>
        <Link to={`/article/${article.slug}`} className={s.article__title}>
          <h2>{article.title}</h2>
        </Link>
        <p className={s.article__descr}>{article.description}</p>
        <div className={s.article__footer}>
          <Link to={`/article/${article.slug}`} className={s.article__more}>
            Развернуть...
          </Link>
          <Tags tags={article.tagList} onClickTag={() => {}} style="grey" />
        </div>
      </div>
    </li>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
