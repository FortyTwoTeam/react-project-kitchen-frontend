import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import ButtonTheme from '../ButtonTheme/ButtonTheme';
import clsx from 'clsx';

const {header, navbar, navbar_brand, nav, navbar_nav, pull_xs_right, nav_item, nav_link, user_item, ava_image} = styles;

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <>
        <li className={nav_item}>
          <Link to="/login" className={nav_link}>
            Войти
          </Link>
        </li>

        <li className={nav_item}>
          <Link to="/register" className={nav_link}>
            Зарегестрироваться
          </Link>
        </li>
      </>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <>
        <li className={nav_item}>
          <Link to="/editor" className={nav_link}>
            <i className="ion-compose"></i>&nbsp;Новая запись
          </Link>
        </li>

        <li className={nav_item}>
          <Link to="/settings" className={nav_link}>
            <i className="ion-gear-a"></i>&nbsp;Настройки
          </Link>
        </li>

        <li className={nav_item}>
          <Link
            to={`/@${props.currentUser.username}`}
            className={nav_link}>
              <img src={props.currentUser.image ? props.currentUser.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'} alt="ava" className={ava_image}/>
              &nbsp;<p>{props.currentUser.username}</p>
          </Link>
        </li>
      </>
    );
  }

  return null;
};

interface IHeader {
  currentUser?: () => void;
  appName?: string;
}

const Header: FC<IHeader> = (props) => {
  
  return (
    <header className={header}>
      <nav className={navbar}>
          <Link to="/" className={navbar_brand}>
            {props.appName.toLowerCase()}
          </Link>
          <ButtonTheme />
          <ul className={clsx(nav, navbar_nav, pull_xs_right)}>
            <li className={nav_item}>
              <Link to="/" className={nav_link}>
              <i className="ion-home"></i>&nbsp;Главная
              </Link>
            </li>
            <LoggedOutView currentUser={props.currentUser} />

            <LoggedInView currentUser={props.currentUser} />
          </ul>
      </nav>
    </header>
  );
}

export default Header;
