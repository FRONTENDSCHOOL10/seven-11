import ProfileCard from '@/components/MyPage/ProfileCard';
import ProfileHeader from '@/components/MyPage/ProfileHeader';
import ProfileInfo from '@/components/MyPage/ProfileInfo';
import useProfileStore from '@/stores/useProfileStore';
import { getStorageData } from '@/utils/getStorageData';
import { memo, useEffect } from 'react';

function EditProfile() {
  const userData = getStorageData('authInfo');

  console.log(userData);
  return (
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
          userName={'박윤선'}
          badge={'고인물'}
          userImg={'/favicon.svg'}
        />

        <ProfileInfo />
      </div>
    </div>
  );
}

export default memo(EditProfile);
