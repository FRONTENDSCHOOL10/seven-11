import { memo } from 'react';
import ProfileImg from './ProfileImg';
import ProfileBadge from './ProfileBadge';
import { getStorageData } from '@/utils';
import pb from '@/api/pb';
import useProfileStore from '@/stores/useProfileStore';

function MyProfile() {
  const user = getStorageData('authInfo').user;
  const profile = useProfileStore((s) => s.profile);

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
          <ProfileBadge status={profile.level} />
        </div>
        <div className="text-sm text-gray-300">답변 35</div>
      </div>
    </div>
  );
}

export default memo(MyProfile);
