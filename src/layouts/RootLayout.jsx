import FooterNav from '@/components/FooterNav';
import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="">
      <Header />
      <Outlet />
      <FooterNav />
    </div>
  );
}

export default RootLayout;
