import Footer from '../components/Footer';
import Header from '../components/Header';

type Props = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </div>
  );
}
