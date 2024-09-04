import { string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

ChatUser.propTypes = {
  userLink: string,
  userName: string.isRequired,
  userImg: string.isRequired,
};

function ChatUser({ userLink, userName, userImg }) {
  return (
    <Link to={userLink} className="flex flex-row gap-2 p-3 items-center">
      <img
        src={userImg}
        alt={`${userName} 프로필`}
        className="w-[34px] h-[34px] rounded-[6px]"
      />
      <span>{userName}</span>
    </Link>
  );
}

export default memo(ChatUser);
