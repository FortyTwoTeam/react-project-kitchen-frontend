import {useState} from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ADD_COMMENT } from '../../constants/actionTypes';
import styles from './comment.module.css';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

const CommentInput = (props) => {
  const [body, setBody] = useState('')

    const setCommentBody = ev => {
      setBody(ev.target.value);
    };

    const createComment = ev => {
      ev.preventDefault();
      const payload = agent.Comments.create(props.slug,
        {body});
        setBody('');
      props.onSubmit(payload);
    };

  return (
    <form className={styles.create__form} onSubmit={createComment}>
      <section className={styles.create__header}>
        <textarea className={styles.create__textarea}
          placeholder="Написать комментарий"
          value={body}
          onChange={setCommentBody}
          rows="3">
        </textarea>
      </section>
      <section className={styles.create__footer}>
        <button
          className={styles.create__button}
          type="submit">
          Отправить комментарий
        </button>
      </section>
    </form>
  );
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
