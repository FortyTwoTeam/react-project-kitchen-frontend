import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonTheme from '../ButtonTheme/ButtonTheme';
import styles from './Header.module.scss';
import clsx from 'clsx';
import HomeIcon from '../../assets/ico/HomeIcon';
import LoginIcon from '../../assets/ico/LoginIcon';
import LogoutIcon from '../../assets/ico/LogoutIcon';
import UsersIcon from '../../assets/ico/UsersIcon';

import EditArticleIcon from '../../assets/ico/EditArticleIcon';
import { connect } from 'react-redux';
import BaseAvatarIcon from '../../assets/ico/BaseAvatarIcon';
import { EDITOR_PAGE_LOADED } from '../../slices/articles-slice/articles';
import { LOGOUT } from '../../slices/common-slice/common';

const { header, navbar, navbar_brand, nav, navbar_nav, pull_xs_right, nav_item, nav_link, ava_image, active_link } =
  styles;

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onClickLogout: () => {
    dispatch({ type: LOGOUT });
  },
});
const Header = (props) => {
  const { pathname } = useLocation();

  const clickEditHandler = () => {
    props.onLoad();
  };
  const clickLogoutHandler = () => {
    props.onClickLogout();
  };

  return (
    <header className={header}>
      <nav className={navbar}>
        <Link to="/" className={navbar_brand}>
          {props.appName.toLowerCase()}
        </Link>
        <ButtonTheme />
        <ul className={clsx(nav, navbar_nav, pull_xs_right)}>
          <li className={nav_item}>
            <Link to="/" className={`${nav_link} ${pathname === '/' ? active_link : ''}`}>
              <HomeIcon />
              <span>Главная</span>
            </Link>
          </li>
          {!props.currentUser && (
            <li className={nav_item}>
              <Link to="/login" className={`${nav_link} ${pathname === '/login' ? active_link : ''}`}>
                <LoginIcon /> <span>Войти</span>
              </Link>
            </li>
          )}
          {props.currentUser && (
            <>
              <li className={nav_item}>
                <Link to="/users" className={`${nav_link} ${pathname === '/users' ? active_link : ''}`}>
                  <UsersIcon />
                  <span>Пользователи</span>
                </Link>
              </li>
              <li className={nav_item}>
                <Link
                  to="/editor"
                  className={`${nav_link} ${pathname === '/editor' ? active_link : ''}`}
                  onClick={clickEditHandler}>
                  <EditArticleIcon />
                  <span>Новая запись</span>
                </Link>
              </li>
              <li className={nav_item}>
                <Link
                  to={`/profile/${props.currentUser.username}`}
                  className={`${nav_link} ${pathname === `/profile${props.currentUser.username}` ? active_link : ''}`}>
                  {props.currentUser.image && <img src={props.currentUser.image} alt="ava" className={ava_image} />}
                  {!props.currentUser.image && <BaseAvatarIcon />}
                  &nbsp;<span>{props.currentUser.username}</span>
                </Link>
              </li>
              <li className={nav_item}>
                <Link to="/" className={nav_link} onClick={clickLogoutHandler}>
                  <LogoutIcon />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default connect(null, mapDispatchToProps)(Header);
