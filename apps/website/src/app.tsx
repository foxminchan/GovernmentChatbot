import { Suspense } from 'react';
import loadable from '@loadable/component';
import BasicLayout from './layouts/BasicLayout';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Home = loadable(() => import('./features/Home'));
const SignUp = loadable(() => import('./features/SignUp'));
const SignIn = loadable(() => import('./features/SignIn'));
const NotFound = loadable(() => import('./components/NotFound'));
const Introduction = loadable(() => import('./features/Intro'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<CircularProgress />}>
              <Home title="Trang chủ" />
            </Suspense>
          }
        />
        <Route
          path="/dang-nhap"
          element={
            <Suspense fallback={<CircularProgress />}>
              <SignIn title="Đăng nhập" />
            </Suspense>
          }
        />
        <Route
          path="/dang-ky"
          element={
            <Suspense fallback={<CircularProgress />}>
              <SignUp title="Đăng ký" />
            </Suspense>
          }
        />
        <Route
          path="/gioi-thieu"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Introduction title="Giới thiệu" />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<CircularProgress />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
