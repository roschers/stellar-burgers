import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
<<<<<<< HEAD
import { selectUser } from '../../services/slices/userSlice';
=======
import { selectUser, selectUserLoading } from '../../services/selectors';
>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector(selectUser);
<<<<<<< HEAD
  const location = useLocation();

  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

=======
  const loading = useSelector(selectUserLoading);
  const location = useLocation();

  if (loading) {
    // Показываем состояние загрузки, пока проверяется авторизация
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован и это защищенный маршрут
  if (!user && !onlyUnAuth) {
    // Сохраняем текущий путь для возврата после авторизации
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // Если пользователь авторизован и пытается зайти на страницу только для неавторизованных
  if (user && onlyUnAuth) {
    return <Navigate to='/' replace />;
  }

>>>>>>> 9fead279876fa10dc662dbe25d31b99fb77e25e2
  return <>{children}</>;
};
