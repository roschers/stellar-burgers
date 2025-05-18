import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser, selectUserLoading } from '../../services/selectors';

interface ProtectedRouteProps {
  children: ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const location = useLocation();

  if (loading) {
    // Показываем состояние загрузки, пока проверяется авторизация
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован и это защищенный маршрут
  if (!user && !onlyUnAuth) {
    // Сохраняем текущий путь для возврата после авторизации
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Если пользователь авторизован и пытается зайти на страницу только для неавторизованных
  if (user && onlyUnAuth) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
