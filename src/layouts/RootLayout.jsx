import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';
import PostButton from '@/components/PostButton';
import { getStorageData } from '@/utils';
import getDetailedAddress from '@/utils/getDetailedAddress';

export default function RootLayout() {
  const location = useLocation();

  const authInfo = getStorageData('authInfo');
  const userAddress = authInfo?.user?.address || '';
  const detailedAddress = getDetailedAddress(userAddress);

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
        address={detailedAddress || ''}
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
