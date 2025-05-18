import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { testOrders } from '../../utils/test-orders';
import { Routes, Route } from 'react-router-dom';
import { FeedOrderDetails } from './order-details';

export const Feed: FC = () => {
  const orders: TOrder[] = testOrders;

  return (
    <Routes>
      <Route
        path=''
        element={<FeedUI orders={orders} handleGetFeeds={() => {}} />}
      />
      <Route path=':id' element={<FeedOrderDetails orders={orders} />} />
    </Routes>
  );
};
