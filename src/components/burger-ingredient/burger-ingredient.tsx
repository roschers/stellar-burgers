import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
<<<<<<< HEAD
import { addIngredient } from '../../services/slices/constructorSlice';

=======
import { setCurrentIngredient } from '../../services/slices/currentIngredientSlice';
import { addIngredient } from '../../services/slices/burgerConstructorSlice';
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
<<<<<<< HEAD
=======
      dispatch(setCurrentIngredient(ingredient));
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
