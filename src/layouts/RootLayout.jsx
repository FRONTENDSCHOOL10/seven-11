import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';

export default function RootLayout() {
  const location = useLocation();

  const isChatroom = location.pathname.includes('/chat');
  const isMap = location.pathname.includes('/map');
  const isProfile = location.pathname.includes('/mypage');
  return (
    <div className="w-full">
      <Header
        address=""
        isChatroom={isChatroom}
        isMap={isMap}
        isProfile={isProfile}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
}
