import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';

export default function RootLayout() {
  const location = useLocation();

  const isChatroom = location.pathname.includes('/chat');

  const isHiddenHeader =
    location.pathname.includes('/map') ||
    location.pathname.includes('/profile') ||
    location.pathname.includes('/mypage');
  return (
    <div className="w-full">
      <Header
        address=""
        isChatroom={isChatroom}
        isHiddenHeader={isHiddenHeader}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
}
