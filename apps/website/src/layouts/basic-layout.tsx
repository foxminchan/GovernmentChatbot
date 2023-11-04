import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

type Props = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Header />
      <Navbar />
      <main className="container px-4 mx-auto">{children}</main>
      <Footer />
    </>
  );
}
