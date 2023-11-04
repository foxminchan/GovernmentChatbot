import { Route, Routes } from 'react-router-dom';
import NxWelcome from './components/NxBase';
import { NotFound } from './components/NotFound';
import BasicLayout from './layouts/basic-layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NxWelcome title="Welcome" />} />
      <Route path="/home" element={<BasicLayout children={undefined}/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
