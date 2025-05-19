import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/slices/FeedDataSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const feed = {
    total: orders.length,
    totalToday: orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      const today = new Date();
      return orderDate.toDateString() === today.toDateString();
    }).length
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
