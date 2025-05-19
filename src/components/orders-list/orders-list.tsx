import { FC, memo } from 'react';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';
import { TOrder, TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const ingredients = useSelector(selectIngredients);

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).map((order: TOrder) => {
    const ingredientsInfo = order.ingredients.reduce((acc: TIngredient[], id) => {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        acc.push(ingredient);
      }
      return acc;
    }, []);

    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);

    return {
      ...order,
      ingredientsInfo,
      total,
      date: new Date(order.createdAt)
    };
  });

  return <OrdersListUI orderByDate={orderByDate} />;
});
