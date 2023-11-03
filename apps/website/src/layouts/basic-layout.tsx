import React, { Suspense } from 'react';

const Footer = React.lazy(() => import('../components/Footer'));
const Header = React.lazy(() => import('../components/Header'));

type Props = {
  children: React.ReactNode;
};

export default function BasicLayout({ children }: Readonly<Props>) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <div className="container mx-auto px-4">{children}</div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
