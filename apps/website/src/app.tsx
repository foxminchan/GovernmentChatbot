import { Route, Routes } from 'react-router-dom';
import NxWelcome from './components/NxBase';
import { NotFound } from './components/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NxWelcome title="Welcome" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
