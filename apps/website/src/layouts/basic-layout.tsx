import React, { Suspense } from 'react';

const Footer = React.lazy(() => import('../components/Footer'));
const Header = React.lazy(() => import('../components/Header'));
const Navbar = React.lazy(() => import('../components/Navbar'));

type Props = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Navbar />
      </Suspense>
      <main className="container px-4 mx-auto">{children}</main>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}
