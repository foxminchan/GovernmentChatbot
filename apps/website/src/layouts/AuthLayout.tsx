import Cookies from 'js-cookie';
import { StorageKeys } from '../@types/keys';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return Cookies.get(StorageKeys.ACCESS_TOKEN) ? (
    <Outlet />
  ) : (
    <Navigate to="/dang-nhap" replace />
  );
}
