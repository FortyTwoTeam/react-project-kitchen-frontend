import ArticleActions from './ArticleActions';
import { useParams } from 'react-router-dom';
import CommentContainer from '../Comment/CommentContainer';
import React, { useEffect } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import styles from './article.module.scss';
import Tags from '../Tags/Tags';
import UserMeta from '../UserMeta/UserMeta';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../slices/articles-slice/articles';

const mapStateToProps = (state) => ({
  ...state.articles,
  article: state.articles.currentArticle,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

const Article = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.onLoad(Promise.all([agent.Articles.get(id), agent.Comments.forArticle(id)]));

    return () => {
      props.onUnload();
    };
    //eslint-disable-next-line
  }, []);

  if (!props.article) {
    return null;
  }

  const markup = { __html: marked(props.article.body, { sanitize: true }) };
  const canModify = props.currentUser && props.currentUser.username === props.article.author.username;
  return (
    <div className="article-page">
      <div className={styles.banner}>
        <div className={styles.banner__container}>
          <UserMeta article={props.article} section="article" />
          <ArticleActions canModify={canModify} article={props.article} />
        </div>
      </div>

      <div className={styles.page__container}>
        <div className={styles.page__content}>
          <div>
            <h1>{props.article.title}</h1>
            <div className={styles.page__text} dangerouslySetInnerHTML={markup}></div>

            <div className={styles.page__taglist}>
              <Tags tags={props.article.tagList} onClickTag={() => {}} subType={true} />
            </div>
          </div>
        </div>

        <div className="article-actions"></div>

        <div className="row">
          <CommentContainer
            article={props.article}
            comments={props.comments || []}
            errors={props.commentErrors}
            slug={id}
            currentUser={props.currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
