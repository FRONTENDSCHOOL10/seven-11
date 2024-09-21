import pb from '@/api/pb';
import { memo } from 'react';
import { getTimeDifference } from '@/utils';
import { object } from 'prop-types';

PostUser.propTypes = {
  user: object,
};

function PostUser({ user }) {
  const { nickname, avatar, created } = user;

  const timeDiff = getTimeDifference(created);

  return (
    <div className="flex items-center gap-[10px]">
      <img
        src={user ? pb.files.getUrl(user, avatar) : '/favicon.svg'}
        className="w-[30px] h-[30px] rounded-full"
      />
      <div className="flex flex-col text-sm">
        <span className="font-semibold">{nickname}</span>
        <span className="text-gray-400">{timeDiff}</span>
      </div>
    </div>
  );
}

export default memo(PostUser);
