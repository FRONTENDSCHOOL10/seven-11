import FooterNav from '@/components/FooterNav';
import Header from '@/components/Header';
import { getStorageData } from '@/utils';
import getDetailedAddress from '@/utils/getDetailedAddress';
import { Outlet, useLocation } from 'react-router-dom';

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

  return (
    <div className="flex flex-col h-screen w-full">
      <Header
        address={detailedAddress || ''}
        isChatroom={isChatroom}
        isHiddenHeader={isHiddenHeader}
      />
      <main className="w-full">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
}
