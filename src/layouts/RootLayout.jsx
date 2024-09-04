import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';

export default function RootLayout() {
  return (
    <div className="w-full">
      <Header address="" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
}
