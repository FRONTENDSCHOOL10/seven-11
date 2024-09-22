import { memo } from 'react';
import ProfileImg from './ProfileImg';
import ProfileBadge from './ProfileBadge';
import pb from '@/api/pb';
import { object } from 'prop-types';

MyProfile.propTypes = {
  user: object,
};

function MyProfile({ user }) {
  return (
    <div className="flex items-center flex-col gap-[9px] mt-[42px]">
      <ProfileImg
        width={68}
        height={68}
        userImg={
          user.avatar ? pb.files.getUrl(user, user.avatar) : '/favicon.svg'
        }
        isHiddenSVG={true}
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-[6px]">
          <div className="text-lg font-semibold">{user.nickname}</div>
          <ProfileBadge status={user.level} />
        </div>
        <div className="text-sm text-gray-300">답변 35</div>
      </div>
    </div>
  );
}

export default memo(MyProfile);
