import { memo } from 'react';

import { oneOf, string } from 'prop-types';
import ProfileBadge from './ProfileBadge';
import ProfileImg from './ProfileImg';

ProfileCard.propTypes = {
  userName: string,
  badge: oneOf(['뉴비', '고인물', '화석']),
  userImg: string,
};

function ProfileCard({ userName, badge, userImg }) {
  return (
    <div className="flex w-full bg-white justify-between py-3 px-4 rounded-lg">
      <div className="flex flex-col items-start justify-center gap-1">
        <span className="font-semibold">{userName}</span>
        <ProfileBadge status={badge} />
      </div>
      <ProfileImg userImg={userImg} isHiddenSVG={true} width={50} height={50} />
    </div>
  );
}

export default memo(ProfileCard);
