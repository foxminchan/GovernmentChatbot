import { Suspense } from 'react';
import loadable from '@loadable/component';
import BasicLayout from './layouts/BasicLayout';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import AuthLayout from './layouts/AuthLayout';

const Home = loadable(() => import('./features/Home'));
const ChatBot = loadable(() => import('./features/Chat'));
const SignUp = loadable(() => import('./features/SignUp'));
const SignIn = loadable(() => import('./features/SignIn'));
const Introduction = loadable(() => import('./features/Intro'));
const NotFound = loadable(() => import('./components/NotFound'));
const Payment = loadable(() => import('./features/Payment'));
const Policy = loadable(() => import('./features/Policy'));
const Guide = loadable(() => import('./features/Guide'));
const Notification = loadable(() => import('./features/Notification'));

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/chat-bot" element={<ChatBot title="Chat bot" />} />
      </Route>
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
          path="/thanh-toan-truc-tuyen"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Payment title="Thanh toán trực tuyến" />
            </Suspense>
          }
        />
        <Route
          path="/dieu-khoan-su-dung"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Policy title="Điều khoản sử dụng" />
            </Suspense>
          }
        />
        <Route
          path="/huong-dan-su-dung"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Guide title="Hướng dẫn sử dụng" />
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
