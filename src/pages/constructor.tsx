import { FC } from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import styles from './constructor.module.css';

export const ConstructorPage: FC = () => (
  <main className={styles.main}>
    <BurgerIngredients />
    <BurgerConstructor />
  </main>
);
