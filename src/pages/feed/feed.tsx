import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FeedOrderDetails } from './order-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedData,
  selectFeedOrders
} from '../../services/slices/FeedDataSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(selectFeedOrders);

  useEffect(() => {
    dispatch(getFeedData());
    dispatch(getIngredients());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <FeedUI
            orders={orders}
            handleGetFeeds={() => dispatch(getFeedData())}
          />
        }
      />
      <Route path=':id' element={<FeedOrderDetails orders={orders} />} />
    </Routes>
  );
};
