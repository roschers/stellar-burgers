import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectLoadingStatus,
  selectError as selectIngredientsError
} from '../../services/slices/ingredientsSlice';
import {
  selectFeedError,
  selectFeedLoading
} from '../../services/slices/FeedDataSlice';
import { TOrder } from '@utils-types';
import { OrderInfoUI } from '../../components/ui/order-info';
import { Preloader } from '../../components/ui/preloader';

interface FeedOrderDetailsProps {
  orders: TOrder[];
}

export const FeedOrderDetails: FC<FeedOrderDetailsProps> = ({ orders }) => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectLoadingStatus);
  const ingredientsError = useSelector(selectIngredientsError);
  const feedLoading = useSelector(selectFeedLoading);
  const feedError = useSelector(selectFeedError);
  const order = orders.find((o) => o.number.toString() === id);

  useEffect(() => {
    console.log('FeedOrderDetails Debug:', {
      orderId: id,
      orderFound: !!order,
      ingredientsCount: ingredients.length,
      ingredientsLoading,
      ingredientsError,
      feedLoading,
      feedError,
      ordersCount: orders.length
    });
  }, [
    id,
    order,
    ingredients,
    ingredientsLoading,
    ingredientsError,
    feedLoading,
    feedError,
    orders
  ]);

  if (ingredientsLoading || feedLoading) {
    return <Preloader />;
  }

  if (ingredientsError || feedError) {
    return (
      <div className='text text_type_main-medium text_color_error'>
        Ошибка загрузки данных: {ingredientsError || feedError}
      </div>
    );
  }

  if (!ingredients.length) {
    return (
      <div className='text text_type_main-medium text_color_error'>
        Не удалось загрузить ингредиенты
      </div>
    );
  }

  if (!order) {
    return <div className='text text_type_main-medium'>Заказ не найден</div>;
  }

  const ingredientsInfo = order.ingredients.reduce((acc: any, item) => {
    const ingredient = ingredients.find((ing) => ing._id === item);
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
