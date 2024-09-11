import { memo, useEffect, useState } from 'react';
import ProfileImg from './ProfileImg';
import ProfileBadge from './ProfileBadge';
import { getStorageData } from '@/utils';
import pb from '@/api/pb';

function MyProfile() {
  const user = getStorageData('authInfo').user;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const record = await pb
          .collection('User_Profile')
          .getFirstListItem(`user.id="${user.id}"`);
        setProfile(record);
      } catch (error) {
        console.error('User_Profile를 가져오는 데 실패했습니다.:', error);
      }
    };

    fetchUserProfile();
  }, [user.id]);

  console.log(profile);

  return (
    <div className="flex items-center flex-col gap-[9px] mt-[42px]">
      <ProfileImg
        width={68}
        height={68}
        userImg={pb.files.getUrl(user, user.avatar)}
        isHiddenSVG={true}
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-[6px]">
          <div className="text-lg font-semibold">{user.nickname}</div>
          <ProfileBadge status={'뉴비'} />
        </div>
        <div className="text-sm text-gray-300">답변 35</div>
      </div>
    </div>
  );
}

export default memo(MyProfile);
