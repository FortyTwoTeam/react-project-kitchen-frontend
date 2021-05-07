import React from 'react';

import style from './error-indicator.module.css';
import icon from './error-404.jpg';

const ErrorIndicator = () => {
  return (
    <div className={style.error_indicator}>
      <img src={icon} alt="error icon"/>
    </div>
  );
};

export default ErrorIndicator;
