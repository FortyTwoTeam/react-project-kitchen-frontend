import { Link } from 'react-router-dom';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import styles from './article.module.css';
import Button from '../Button/Button'
import DeleteIcon from '../Comment/DeleteIcon'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_ARTICLE, payload })
});

const ArticleActions = props => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug))
  };
  if (props.canModify) {
    return (
      <div className={styles.controls}>

        <Link
          to={`/editor/${article.slug}`}
          >
          <Button children={'Редактировать запись'}/>
        </Link>

        <button className={styles.controls__delete} onClick={del}>
          <DeleteIcon /> <span>Удалить запись</span>
        </button>

      </div>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
