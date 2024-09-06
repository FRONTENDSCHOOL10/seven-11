import ProfileImg from '@/components/MyPage/ProfileImg';
import { memo } from 'react';
import ProfileHeader from '../../components/MyPage/ProfileHeader';
import ProfileEditSection from '@/components/MyPage/ProfileEditSection';
import Agreement from '@/components/MyPage/Agreement';
import ProfileButton from '@/components/MyPage/ProfileButton';

function ProfileDetail() {
  return (
    <div>
      <ProfileHeader to={'/home/user-info/profile-edit'}>기본정보</ProfileHeader>
      <div className="flex flex-col items-center mt-4">
        <ProfileImg
          userImg="/favicon.svg"
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
  );
}

export default memo(ProfileDetail);
