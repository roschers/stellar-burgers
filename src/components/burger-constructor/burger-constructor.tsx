import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectConstructorItems,
  selectConstructorTotal
} from '../../services/slices/burgerConstructorSlice';
import { selectIsAuthenticated } from '../../services/slices/userSlice';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const price = useSelector(selectConstructorTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [showModal, setShowModal] = useState(false);
  const [orderNumber] = useState(34536); // хардкод

  const onOrderClick = () => {
    if (!constructorItems.bun) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/constructor' } });
      return;
    }
    setShowModal(true);
  };

  const closeOrderModal = () => {
    setShowModal(false);
  };

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={constructorItems}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      showModal={showModal}
      orderNumber={orderNumber}
    />
  );
};
