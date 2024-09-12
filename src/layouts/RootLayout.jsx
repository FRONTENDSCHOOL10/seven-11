import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';
import PostButton from '@/components/PostButton'; // PostButton 추가

export default function RootLayout() {
  const location = useLocation();

  const isChatroom = location.pathname.includes('/chat');
  const isHiddenHeader =
    location.pathname.includes('/map') ||
    location.pathname.includes('/profile') ||
    location.pathname.includes('/user-info');

  const showPostButton =
    location.pathname === '/home' || location.pathname === '/home/board';

  return (
    <div className="relative flex flex-col h-[693px] w-full">
      <Header
        address=""
        isChatroom={isChatroom}
        isHiddenHeader={isHiddenHeader}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      {showPostButton && <PostButton />}
      <FooterNav />
    </div>
  );
}
