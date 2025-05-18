import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { TOrder } from '@utils-types';
import { testIngredients } from '../../utils/test-orders';
import { OrderInfoUI } from '../../components/ui/order-info';
import { Preloader } from '../../components/ui/preloader';

interface FeedOrderDetailsProps {
  orders: TOrder[];
}

export const FeedOrderDetails: FC<FeedOrderDetailsProps> = ({ orders }) => {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((o) => o.number.toString() === id);

  if (!order) {
    return <Preloader />;
  }

  // Формируем данные для OrderInfoUI
  const ingredientsInfo = order.ingredients.reduce((acc: any, item) => {
    const ingredient = testIngredients.find((ing) => ing._id === item);
    if (ingredient) {
      if (!acc[item]) {
        acc[item] = { ...ingredient, count: 1 };
      } else {
        acc[item].count++;
      }
    }
    return acc;
  }, {});

  const total = Object.values(ingredientsInfo).reduce(
    (acc: number, item: any) => acc + item.price * item.count,
    0
  );

  const orderInfo = {
    ...order,
    ingredientsInfo,
    date: new Date(order.createdAt),
    total
  };

  return <OrderInfoUI orderInfo={orderInfo} />;
};
