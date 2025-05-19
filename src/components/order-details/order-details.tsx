import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectUserOrdersModalOrder,
  selectUserOrdersError,
  selectFeedModalOrder,
  selectFeedError,
  selectUser
} from '../../services/selectors';
import { getOrderByNumber } from '../../services/slices/orderSlice';
import { getOrderByNum } from '../../services/slices/FeedDataSlice';
import { Preloader } from '../ui/preloader';
import { OrderDetailsUI } from '../ui/order-details';
import { TOrder } from '../../utils/types';

export const OrderDetails: FC = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isFeed = window.location.pathname.startsWith('/feed');
  const order = useSelector(
    isFeed ? selectFeedModalOrder : selectUserOrdersModalOrder
  );
  const error = useSelector(isFeed ? selectFeedError : selectUserOrdersError);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (number) {
      dispatch(
        isFeed
          ? getOrderByNum(Number(number))
          : getOrderByNumber(Number(number))
      );
    }
  }, [dispatch, number, isFeed]);

  useEffect(() => {
    if (!user && window.location.pathname.startsWith('/profile/orders')) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      navigate('/', { replace: true });
    }
  }, [error, navigate]);

  if (!order) {
    return <Preloader />;
  }

  return <OrderDetailsUI orderNumber={order.number} />;
};
