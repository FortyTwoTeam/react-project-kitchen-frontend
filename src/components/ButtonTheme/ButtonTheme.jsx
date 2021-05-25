import React, { useState } from 'react';
import cn from 'classnames';
import s from './ButtonTheme.module.scss';

import {
  SWITCH_THEME
} from '../../constants/actionTypes'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  darkTheme: state.common.darkTheme,
});


const mapDispatchToProps = dispatch => ({
  // onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  switchTheme: () => dispatch({ type: SWITCH_THEME })
});

const ButtonTheme = (props) => {
  // const darkTheme = useSelector(store => store)
  const {darkTheme, switchTheme} = props

  // const [isPress, setPress] = useState(false);
  // const colorsChanged = {
  //   white: '#251D1D',
  //   dark: '#ffffff',
  //   darkText: '#ffffff',
  //   grayText: '#ffffff',
  //   bannerColor:'#251D1D',
  //   primary:'#ffffff',

  // };
  // const colorsDefault = {
  //   white: '#ffffff',
  //   dark: '#212121',
  //   darkText: '#0A0A0B',
  //   grayText: '#62626A',
  //   bannerColor:'#f4f4f6',
  //   primary:'#0000FF',
  // };
  const handleClick = () => {
    switchTheme()
    // setPress((prev) => !prev);
    // const root = document.querySelector(':root');
    // if (!isPress) {
    //   root.style = `--white:${colorsChanged.white}; 
    //   --dark:${colorsChanged.dark}; 
    //   --dark-text:${colorsChanged.darkText}; 
    //   --gray-text:${colorsChanged.grayText};
    //   --banner-color:${colorsChanged.bannerColor};
    //   --primary:${colorsChanged.primary};
    //   `;
    // }
    // if (isPress) {
    //   root.style = `--white:${colorsDefault.white};
    //   --dark:${colorsDefault.dark};
    //   --dark-text:${colorsDefault.darkText};
    //   --gray-text:${colorsDefault.grayText};
    //   --banner-color:${colorsDefault.bannerColor};
    //   --primary:${colorsDefault.primary};
    //   `;
    // }
  };
  return (
    <div className={cn(s.wrapper)}>
      <label htmlFor="theme" className={cn(s.text)}>
        {darkTheme ? 'Тёмная тема' : 'Светлая тема'}
      </label>
      <input
        type="checkbox"
        name="theme"
        id="theme"
        className={cn(s.button, { [s.active]: darkTheme })}
        onClick={handleClick}
      />
    </div>
  );
};

// export default ButtonTheme;

export default connect(mapStateToProps, mapDispatchToProps)(ButtonTheme);

