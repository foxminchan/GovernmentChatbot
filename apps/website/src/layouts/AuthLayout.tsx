import Cookies from 'js-cookie';
import { StorageKeys } from '../common/constants/keys';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
  const location = useLocation();
  const isAuthenticated = !!Cookies.get(StorageKeys.ACCESS_TOKEN);

  if (
    isAuthenticated &&
    (location.pathname === '/dang-nhap' || location.pathname === '/dang-ky')
  ) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" replace />;
  }

  return <Outlet />;
}
