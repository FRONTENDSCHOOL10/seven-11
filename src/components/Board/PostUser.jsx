import pb from '@/api/pb';
import { memo } from 'react';
import { getTimeDifference } from '@/utils';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import usePostStore from '@/stores/usePostStore';

PostUser.propTypes = {
  user: object,
};

function PostUser({ user }) {
  const post = usePostStore((s) => s.post);

  const { nickname, avatar, id } = user;

  const timeDiff = getTimeDifference(post.created);

  return (
    <Link to={`/profile/${id}`} className="flex items-center gap-[10px]">
      <img
        src={user ? pb.files.getUrl(user, avatar) : '/favicon.svg'}
        className="w-[30px] h-[30px] rounded-full"
      />
      <div className="flex flex-col text-sm">
        <span className="font-semibold">{nickname}</span>
        <span className="text-gray-400">{timeDiff}</span>
      </div>
    </Link>
  );
}

export default memo(PostUser);
