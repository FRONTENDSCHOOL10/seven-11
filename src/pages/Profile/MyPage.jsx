import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ContentNav,
  InfoNav,
  MyMenu,
  MyProfile,
  Temperature,
} from '@/components/MyPage';
import ProfileRootLayout from '@/layouts/ProfileRootLayout';
import useProfileStore from '@/stores/useProfileStore';
import { getStorageData } from '@/utils';

export default function MyPage() {
  const user = getStorageData('authInfo').user;
  const { profile, fetchUserProfile } = useProfileStore();

  useEffect(() => {
    fetchUserProfile(user);
  }, [fetchUserProfile]);

  if (!profile || Object.keys(profile).length === 0) {
    return <div>페이지 로딩중...</div>;
  }

  return (
    <>
      <Helmet>
        <title>작심하루 - 마이페이지</title>
        <meta name="description" content="내 정보를 확인하고 수정하세요." />
      </Helmet>
      <div>
        <MyProfile />
        <MyMenu />
        <Temperature temp={profile.userTemp} />
        <ContentNav />
        <InfoNav />
        <ProfileRootLayout />
      </div>
    </>
  );
}
