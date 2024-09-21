import { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FadeLoader from 'react-spinners/FadeLoader';
import {
  ContentNav,
  InfoNav,
  MyMenu,
  MyProfile,
  Temperature,
} from '@/components/MyPage';
import ProfileRootLayout from '@/layouts/ProfileRootLayout';
import useProfileStore from '@/stores/useProfileStore';

export default function MyPage() {
  const { user, fetchUserData } = useProfileStore((s) => ({
    user: s.user,
    fetchUserData: s.fetchUserData,
  }));

  const fetchOnce = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(fetchOnce, [fetchOnce]);

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>작심하루 - 마이페이지</title>
        <meta name="description" content="내 정보를 확인하고 수정하세요." />
      </Helmet>
      <div>
        <MyProfile user={user} />
        <MyMenu />
        <Temperature temp={user.userTemp} />
        <ContentNav title='내 관심사' />
        <InfoNav user={user} />
        <ProfileRootLayout />
      </div>
    </>
  );
}
