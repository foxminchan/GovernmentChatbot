import Home from './features/Home';
import SignUp from './features/SignUp';
import SignIn from './features/SignIn';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import BasicLayout from './layouts/BasicLayout';

export default function App() {
  return (
    <BasicLayout>
      <Routes>
        <Route index element={<Home title="Trang chủ" />} />
        <Route path="/dang-nhap" element={<SignIn title="Đăng nhập" />} />
        <Route path="/dang-ky" element={<SignUp title="Đăng ký" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BasicLayout>
  );
}
