import ContentNav from '@/components/MyPage/ContentNav';
import InfoNav from '@/components/MyPage/InfoNav';
import MyMenu from '@/components/MyPage/MyMenu';
import MyProfile from '@/components/MyPage/MyProfile';
import Temperature from '@/components/MyPage/Temperature';

export function Component() {
  return (
    <div>
      <MyProfile />
      <MyMenu />
      <Temperature temp={41.2} />
      <ContentNav />
      <InfoNav />
    </div>
  );
}
