import agent from '../../agent';
import Header from '../Header/Header';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Article from '../Article';
import Editor from '../Editor/Editor';
import Home from '../Home';
import Login from '../Auth/Login/Login';
import Profile from '../Profile/Profile';
import Users from '../Users/Users';
import Register from '../Auth/Register/Register';
import Settings from '../Settings/Settings';
import { APP_LOAD, CHANGE_THEME } from '../../slices/common-slice/common';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Page404 from '../404/404';
const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    isDarkTheme: state.common.isDarkTheme,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onChangeTheme: () => dispatch({ type: CHANGE_THEME }),
});

const App = (props) => {
  const root = document.querySelector(':root');
  const darkTheme = {
    back: '#1F2023',
    dark: '#5299ff',
    darkText: '#ffffff',
    grayText: '#ffffff',
    bannerColor: '#27292D',
    primary: '#FFB852',
    tagsBlock: '#27292D',
    tags: '#27292D',
    tagsBorder: '#0B0C0D',
    buttonShadow: 'rgba(255, 144, 14, 0.35)',
    redHeart: '#F53D5C',
    deleteBtn: '',
    commentContainer: '#27292D',
    commentInput: '#2D2F34',
    previewLink: '#5299ff',
  };
  const whiteTheme = {
    back: '#ffffff',
    dark: '#212121',
    darkText: '#0A0A0B',
    grayText: '#62626A',
    bannerColor: '#f4f4f6',
    primary: '#0000FF',
    tagsBlock: '#f4f4f6',
    tags: 'rgb(241, 241, 241)',
    tagsBorder: '#CCCCCC',
    buttonShadow: 'rgba(0, 0, 255, 0.25)',
    redHeart: '#F53D5C',
    deleteBtn: '',
    commentContainer: '#ffffff',
    commentInput: '#f4f4f6',
    previewLink: '#0000FF',
  };

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    props.onLoad(token ? agent.Auth.current() : null, token);
    if (localStorage.getItem('isDarkTheme') === 'true') {
      props.onChangeTheme();
    }
    root.style = `--white:${whiteTheme.back};
                  --dark:${whiteTheme.dark};
                  --dark-text:${whiteTheme.darkText};
                  --gray-text:${whiteTheme.grayText};
                  --banner-color:${whiteTheme.bannerColor};
                  --primary:${whiteTheme.primary};
                  --tags-block:${whiteTheme.tagsBlock};
                  --tags:${whiteTheme.tags};
                  --tags-border:${whiteTheme.tagsBorder};
                  --button-shadow:${whiteTheme.buttonShadow};
                  --red-heart:${whiteTheme.redHeart};
                  --delete-btn:${whiteTheme.deleteBtn};
                  --comment-container:${whiteTheme.commentContainer};
                  --comment-input:${whiteTheme.commentInput};
                  --preview-link:${whiteTheme.previewLink};
                  `;
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    localStorage.setItem('isDarkTheme', props.isDarkTheme);
    props.isDarkTheme
      ? (root.style = `--white:${darkTheme.back};
            --dark:${darkTheme.dark};
            --dark-text:${darkTheme.darkText};
            --gray-text:${darkTheme.grayText};
            --banner-color:${darkTheme.bannerColor};
            --tags-block:${darkTheme.tagsBlock};
            --primary:${darkTheme.primary};
            --tags:${darkTheme.tags};
            --tags-border:${darkTheme.tagsBorder};
            --button-shadow:${darkTheme.buttonShadow};
            --red-heart:${darkTheme.redHeart};
            --delete-btn:${darkTheme.deleteBtn};
            --comment-container:${darkTheme.commentContainer};
            --comment-input:${darkTheme.commentInput};
            --preview-link:${darkTheme.previewLink};
            --preview-link-hover:${darkTheme.primary};
            `)
      : (root.style = `--white:${whiteTheme.back};
            --dark:${whiteTheme.dark};
            --dark-text:${whiteTheme.darkText};
            --gray-text:${whiteTheme.grayText};
            --banner-color:${whiteTheme.bannerColor};
            --primary:${whiteTheme.primary};
            --tags-block:${whiteTheme.tagsBlock};
            --tags:${whiteTheme.tags};
            --tags-border:${whiteTheme.tagsBorder};
            --button-shadow:${whiteTheme.buttonShadow};
            --red-heart:${whiteTheme.redHeart};
            --delete-btn:${whiteTheme.deleteBtn};
            --comment-container:${whiteTheme.commentContainer};
            --comment-input:${whiteTheme.commentInput};
            --preview-link:${whiteTheme.previewLink};
            --preview-link-hover:${whiteTheme.darkText};
            `);
    //eslint-disable-next-line
  }, [props.isDarkTheme]);

  const render = () => {
    if (props.appLoaded) {
      return (
        <>
          <Header appName={props.appName} currentUser={props.currentUser} />
          <Switch>
            <Route exact path="/" children={<Home />} />
            <Route path="/login" children={<Login />} />
            <Route path="/register" children={<Register />} />
            <ProtectedRoute path="/editor/:slug" children={<Editor />} />
            <ProtectedRoute path="/editor" children={<Editor />} />
            <Route path="/article/:id" children={<Article />} />
            <ProtectedRoute path="/settings" children={<Settings />} />
            <ProtectedRoute path="/profile/:username" children={<Profile />} />
            <Route path="/users/" children={<Users />} />
            <Route path="*" children={<Page404 />} />
          </Switch>
        </>
      );
    }
    return (
      <div>
        <Header appName={props.appName} currentUser={props.currentUser} />
      </div>
    );
  };

  return render();
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
