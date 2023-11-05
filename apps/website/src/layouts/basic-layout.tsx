import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

type Props = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: Readonly<Props>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
