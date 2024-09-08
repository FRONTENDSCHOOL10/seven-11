import { memo } from 'react';
import ProfileBadge from './ProfileBadge';
import ProfileImg from './ProfileImg';

function ProfileCard({ userName, badge, userImg }) {
  return (
    <div className="flex w-full bg-white gap-[168px] justify-center p-3 rounded-lg">
      <div className="flex flex-col items-start justify-center gap-1">
        <span className="font-semibold">{userName}</span>
        <ProfileBadge status={badge} />
      </div>
      <ProfileImg userImg={userImg} isHiddenSVG={true} width={50} height={50} />
    </div>
  );
}

export default memo(ProfileCard);
