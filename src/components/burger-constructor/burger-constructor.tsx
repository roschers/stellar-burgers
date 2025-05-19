import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorItems,
  selectConstructorTotal,
  createOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/burgerConstructorSlice';
import { selectIsAuthenticated } from '../../services/slices/userSlice';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorItems);
  const price = useSelector(selectConstructorTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const orderModalData = useSelector(selectOrderModalData);
  const orderRequest = useSelector(selectOrderRequest);

  const [showModal, setShowModal] = useState(false);

  const onOrderClick = () => {
    if (!constructorItems.bun) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/constructor' } });
      return;
    }

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredients));
  };

  const closeOrderModal = () => {
    setShowModal(false);
  };

  // Показываем модальное окно только когда заказ создан и получен его номер
  useEffect(() => {
    if (orderModalData?.number && !orderRequest) {
      setShowModal(true);
    }
  }, [orderModalData, orderRequest]);

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={constructorItems}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      showModal={showModal}
      orderNumber={orderModalData?.number || 0}
    />
  );
};
