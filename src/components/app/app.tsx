<<<<<<< HEAD
import { FC, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/userSlice';
import { AppHeader } from '../app-header/app-header';
import { ConstructorPage } from '../../pages/constructor';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-found';
import { ProtectedRoute } from '../protected-route/protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderInfo } from '../order-info/order-info';
import { ModalUI as Modal } from '../ui/modal/modal';

export const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

=======
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages'; // Импортируем страницы для маршрутизации

import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { ProtectedRoute } from '../../components/protected-route';
import { checkUserAuth } from '../../services/slices/userSlice';

const App = () => {
  const navigate = useNavigate(); // Инициализируем хук для навигации
  const location = useLocation(); // Инициализируем хук для получения текущего местоположения
  const dispatch = useDispatch(); // Инициализируем dispatch для вызова экшенов

  // Извлекаем состояние из текущего местоположения
  const locationState = location.state as { background?: Location };
  // Проверяем, есть ли фоновое состояние
  const background = locationState?.background;

  const closeModal = () => {
    navigate(-1);
  };

  // При первом рендере компонента запрашиваем ингредиенты с сервера
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  // При первом рендере компонента проверяем авторизацию пользователя
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Основные роуты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed/*' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* Защищенные роуты для неавторизованных пользователей */}
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
=======
        {/* Защищенные роуты для авторизованных пользователей */}
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
<<<<<<< HEAD
          path='/profile/orders/:id'
=======
          path='/profile/orders/:number'
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

<<<<<<< HEAD
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
=======
        {/* Роут для несуществующих страниц */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {background && (
        <Routes>
          <Route
            path='/feed/:id'
            element={
              <Modal title={''} onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={closeModal}>
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
<<<<<<< HEAD
            path='/feed/:id'
            element={
              <Modal title='Информация о заказе' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal title='Информация о заказе' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
=======
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={''} onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
            }
          />
        </Routes>
      )}
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
  );
};

export default App;
