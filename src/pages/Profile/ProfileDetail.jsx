import { memo, useCallback, useEffect } from 'react';
import pb from '@/api/pb';
import { Helmet } from 'react-helmet-async';
import {
  Agreement,
  ProfileButton,
  ProfileEditSection,
  ProfileHeader,
  ProfileImg,
} from '@/components/MyPage';
import useProfileStore from '@/stores/useProfileStore';

function ProfileDetail() {
  const { user, fetchUserData } = useProfileStore((s) => ({
    user: s.user,
    fetchUserData: s.fetchUserData,
  }));

  const fetchOnce = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(fetchOnce, [fetchOnce]);
  
  return (
    <>
      <Helmet>
        <title>작심하루 - 프로필 수정</title>
        <meta
          name="description"
          content="작심하루에 등록한 나의 프로필을 수정하고 저장할 수 있습니다."
        />
      </Helmet>
      <div>
        <ProfileHeader to={'/home/user-info/profile-edit'}>
          기본정보
        </ProfileHeader>
        <div className="flex flex-col items-center mt-4">
          <ProfileImg
            userImg={pb.files.getUrl(user, user.avatar)}
            width={73}
            height={73}
            isHiddenSVG={false}
          />
        </div>
        <div className="px-3">
          <ProfileEditSection />
        </div>
        <Agreement />
        <div className="flex gap-2 justify-between px-3 mt-[20px] mb-[18px]">
          <ProfileButton>취소</ProfileButton>
          <ProfileButton>저장</ProfileButton>
        </div>
        <span className="text-sm text-gray-300 flex justify-center mb-[34px]">
          정보 초기화 및 이용 동의 철회
        </span>
      </div>
    </>
  );
}

export default memo(ProfileDetail);
