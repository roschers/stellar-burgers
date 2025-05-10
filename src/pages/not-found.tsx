import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export const NotFound404: FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>404</h1>
    <p className={styles.text}>Страница не найдена</p>
    <Link to='/' className={styles.link}>
      Вернуться на главную
    </Link>
  </div>
);
