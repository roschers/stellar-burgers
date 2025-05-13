import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@zlden/react-developer-burger-ui-components';
import { AppHeaderUI } from './app-header-ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC<{}> = () => {
  const location = useLocation();
  const user = useSelector(selectUser);

  const isProfileActive = location.pathname.startsWith('/profile');
  const isFeedActive = location.pathname.startsWith('/feed');

  return (
    <AppHeaderUI
      logo={() => <Logo className='logo' />}
      constructor={() => (
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'text text_type_main-default'
              : 'text text_type_main-default text_color_inactive'
          }
        >
          Конструктор
        </NavLink>
      )}
      feed={() => (
        <NavLink
          to='/feed'
          className={({ isActive }) =>
            isActive || isFeedActive
              ? 'text text_type_main-default'
              : 'text text_type_main-default text_color_inactive'
          }
        >
          Лента заказов
        </NavLink>
      )}
      profile={() => (
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive || isProfileActive
              ? 'text text_type_main-default'
              : 'text text_type_main-default text_color_inactive'
          }
        >
          {user ? 'Личный кабинет' : 'Войти'}
        </NavLink>
      )}
    />
  );
};
