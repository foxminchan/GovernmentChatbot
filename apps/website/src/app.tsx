import Home from './features/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import BasicLayout from './layouts/basic-layout';

export default function App() {
  return (
    <BasicLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BasicLayout>
  );
}
