import { FC, useMemo, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
<<<<<<< HEAD
import { BurgerIngredientsUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../services/slices/ingredientsSlice';
import { addIngredient } from '../../services/slices/constructorSlice';
import { TIngredient, TTabMode } from '@utils-types';
import styles from './burger-ingredients.module.css';

export const BurgerIngredients: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectIngredientsLoading);
=======
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });
<<<<<<< HEAD

  const handleIngredientClick = (ingredient: TIngredient) => {
    dispatch(addIngredient(ingredient));
  };

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') {
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'main') {
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'sauce') {
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
=======
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === 'bun'),
    [ingredients]
  );

<<<<<<< HEAD
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

=======
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
      onIngredientClick={handleIngredientClick}
    />
  );
};
