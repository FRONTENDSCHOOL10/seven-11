import { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import pb from '@/api/pb';

import ProfileCard from '@/components/MyPage/ProfileCard';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import { getStorageData } from '@/utils';
import useProfileStore from '@/stores/useProfileStore';

function EditProfile() {
  const user = getStorageData('authInfo').user;
  const { profile, fetchUserProfile } = useProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!profile || Object.keys(profile).length === 0) {
    return <div>페이지 로딩중...</div>;
  }

  return (
    <>
      <Helmet>
        <title>작심하루 - 프로필 카드</title>
        <meta
          name="description"
          content="프로필 카드를 확인하여 유저 정보를 확인하고 수정할 수 있습니다."
        />
      </Helmet>
      <div className="h-full">
        <ProfileHeader to={'/home/user-info'}>프로필수정</ProfileHeader>

        <div className="flex flex-col items-center p-3 h-full bg-gray-300 gap-[13px]">
          <div className="flex items-center gap-[2px] mt-[85px]">
            <span className="font-semibold text-lg">프로필 카드</span>
            <svg className="w-5 h-5">
              <use href="/stack.svg#information" />
            </svg>
          </div>
          <ProfileCard
            userName={user.nickname}
            badge={profile.level}
            userImg={pb.files.getUrl(user, user.avatar)}
          />
          <ProfileInfo />
        </div>
      </div>
    </>
  );
}

export default memo(EditProfile);
