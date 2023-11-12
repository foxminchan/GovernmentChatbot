import { Suspense } from 'react';
import loadable from '@loadable/component';
import AuthLayout from './layouts/AuthLayout';
import BasicLayout from './layouts/BasicLayout';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Home = loadable(() => import('./features/Home'));
const Guide = loadable(() => import('./features/Guide'));
const ChatBot = loadable(() => import('./features/Chat'));
const SignUp = loadable(() => import('./features/SignUp'));
const SignIn = loadable(() => import('./features/SignIn'));
const Policy = loadable(() => import('./features/Policy'));
const Payment = loadable(() => import('./features/Payment'));
const SignOut = loadable(() => import('./features/SignOut'));
const Introduction = loadable(() => import('./features/Intro'));
const NotFound = loadable(() => import('./components/NotFound'));
const Notification = loadable(() => import('./features/Notification'));

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/dang-xuat" element={<SignOut />} />
        {/* <Route path="/chat-bot" element={<ChatBot title="Chat bot" />} /> */}
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
          path="/gioi-thieu"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Introduction title="Giới thiệu" />
            </Suspense>
          }
        />
        <Route
          path="/thong-bao"
          element={
            <Suspense fallback={<CircularProgress />}>
              <Notification title="Thông báo" />
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
          path="/chat-bot"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ChatBot title="Chat bot" />
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
