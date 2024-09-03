import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';

export default function RootLayout() {
  return (
    <div className="w-[320px] h-[693px] flex flex-col relative mx-auto border border-gray-300">
      <Header address='남가좌제동'/>
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
}
