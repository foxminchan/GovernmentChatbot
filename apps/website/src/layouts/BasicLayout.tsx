import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function BasicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
