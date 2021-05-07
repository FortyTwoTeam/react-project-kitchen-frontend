import React from 'react';
import styles from './banner.module.css'

const Banner = ({ appName }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__container}>
        <h1 className={styles.banner__name}>
          {appName.toLowerCase()}
        </h1>
        <p className={styles.banner__text}>Место, где готовится новый опыт</p>
      </div>
    </div>
  );
};

export default Banner;
