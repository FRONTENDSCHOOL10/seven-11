import MyMenu from '@/components/MyPage/MyMenu';
import MyProfile from '@/components/MyPage/MyProfile';
import Temperature from '@/components/MyPage/Temperature';

export function Component() {
  return (
    <>
      <MyProfile />
      <MyMenu />
      <Temperature temp={36.5} />
    </>
  );
}
