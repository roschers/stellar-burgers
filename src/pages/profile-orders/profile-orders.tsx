import { ProfileOrdersUI } from '../../components/ui/profile-orders';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectUserOrders,
  selectUserOrdersLoading,
  selectUserOrdersError
} from '../../services/selectors';
import { ordersHistory } from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const loading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError) || null;

  useEffect(() => {
    dispatch(ordersHistory());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} loading={loading} error={error} />;
};
