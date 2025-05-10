import { FC } from 'react';
import styles from './app-header.module.css';

export type AppHeaderUIProps = {
  logo: () => JSX.Element;
  constructor: () => JSX.Element;
  feed: () => JSX.Element;
  profile: () => JSX.Element;
};

export const AppHeaderUI: FC<AppHeaderUIProps> = ({
  logo,
  constructor,
  feed,
  profile
}) => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={styles.left}>
        {constructor()}
        {feed()}
      </div>
      <div className={styles.center}>{logo()}</div>
      <div className={styles.right}>{profile()}</div>
    </nav>
  </header>
);
