import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { BurgerConstructorUI } from '@ui';
import {
  createOrder,
  selectCurrentOrder,
  selectOrderLoading
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';
import { selectConstructorIngredients } from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import styles from './burger-constructor.module.css';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const orderRequest = useSelector(selectOrderLoading);
  const currentOrder = useSelector(selectCurrentOrder);
  const constructorItems = useSelector(selectConstructorIngredients) as ConstructorState;

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems?.bun) {
      return;
    }

    if (!constructorItems.bun._id) {
      console.error('Отсутствует _id у булки');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...(constructorItems.ingredients || [])
        .filter((item: TConstructorIngredient) => item._id)
        .map((item: TConstructorIngredient) => item._id),
      constructorItems.bun._id
    ];

    if (ingredientIds.length < 3) {
      console.error('Недостаточно ингредиентов для заказа');
      return;
    }

    dispatch(createOrder(ingredientIds));
  };

  const total = useMemo(() => {
    if (!constructorItems) return 0;
    
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = (constructorItems.ingredients || []).reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <div className={styles.container}>
      <BurgerConstructorUI
        price={total}
        orderRequest={orderRequest}
        constructorItems={constructorItems || { bun: null, ingredients: [] }}
        orderModalData={currentOrder}
        onOrderClick={handleOrderClick}
        closeOrderModal={() => {}}
      />
    </div>
  );
};
