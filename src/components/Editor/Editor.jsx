import ListErrors from '../ListErrors/ListErrors';
import React from 'react';
import agent from '../../agent';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../../constants/actionTypes';
// import {
//   ADD_TAG,
//   EDITOR_PAGE_LOADED,
//   REMOVE_TAG,
//   EDITOR_PAGE_UNLOADED,
//   UPDATE_FIELD_EDITOR
//   // ARTICLE_SUBMITTED,

// } from '../../slices/editor';
// import {
//   ARTICLE_SUBMITTED
// } from '../../slices/settings';
import clipImg from '../../assets/ico/Clip.svg'
import s from './Editor.module.scss'
import Tags from '../Tags/Tags';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
  constructor() {
    super();

    const updateFieldEvent =
      key => ev => this.props.onUpdateField(key, ev.target.value);
    this.changeTitle = updateFieldEvent('title');
    this.changeDescription = updateFieldEvent('description');
    this.changeImage = updateFieldEvent('image');
    this.changeBody = updateFieldEvent('body');
    this.changeTagInput = updateFieldEvent('tagInput');
    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = ev => {
      ev.preventDefault();
      const article = {
        title: this.props.title,
        description: this.props.description,
        image:this.props.image,
        body: this.props.body,
        tagList: this.props.tagList
      };

      const slug = { slug: this.props.articleSlug };
      const promise = this.props.articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);

      this.props.onSubmit(promise);
    };
  }

  

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Articles.get(this.props.match.params.slug));
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  
  render() {
    return (
            <div className={s.container}>

              <ListErrors errors={this.props.errors}></ListErrors>
              <h2 className = {s.title}>Новая запись</h2>
              <form className = {s.form}>
                  <fieldset className={s.form__item}>
                    <input
                      type="text"
                      placeholder="Название записи"
                      value={this.props.title || ''}
                      onChange={this.changeTitle} 
                      required
                    />

                    <input
                      type="text"
                      placeholder="О чём статья?"
                      value={this.props.description || ''}
                      onChange={this.changeDescription} 
                    />

                    <div className = {s.image_input}>
                    <input
                      type="text"
                      placeholder="URL изображения"
                      value={this.props.image || ''}
                      onChange={this.changeImage}
                    />
                    <button className = {s.form__clip} disabled>
                      <img src={clipImg} alt="Clip" />
                    </button>
                    </div>

                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Текст записи"
                      value={this.props.body || ''}
                      onChange={this.changeBody}
                      required>
                    </textarea>

                    <div className={s.tags_generator}>
                    <input
                      type="text"
                      placeholder= {[].concat(this.props.tagList).length > 2 ? "Пасхалка, больше 3х нельзя" : "Теги (введите тег и нажмите enter)"}
                      maxLength={10}
                      value={this.props.tagInput || ''}
                      onChange={this.changeTagInput}
                      onKeyDown={this.watchForEnter} 
                      disabled={[].concat(this.props.tagList).length > 2 ? true : false}
                    />

                    <Tags tags={this.props.tagList}
                      onClickTag={() => {}} 
                      style="dark"/>
                    </div>

                    <Button
                      className = {s.form__button}
                      onClick = {this.submitForm}
                    >
                      Опубликовать запись
                    </Button>
                  </fieldset>

              </form>

            </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
