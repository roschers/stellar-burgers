import { FC } from 'react';
import { TOrder } from '@utils-types';
import { OrderCard } from '../../order-card';
import styles from './profile-orders.module.css';

export type ProfileOrdersUIProps = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({
  orders,
  loading,
  error
}) => {
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
