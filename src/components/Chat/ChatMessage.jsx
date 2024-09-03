import { string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import ChatNowTime from './ChatNowTime';

ChatMessage.propTypes = {
  userName: string.isRequired,
  userImg: string.isRequired,
  message: string.isRequired,
  time: string.isRequired,
  id: string.isRequired,
};

function ChatMessage({ id, userName, userImg, message, time }) {
  return (
    <div>
      <Link to={`/profile/${id}`} className="flex flex-row gap-[7px] w-fit ">
        <img
          src={userImg}
          className="w-[26px] rounded-[5px]"
          alt={`${userName} user`}
        />
        <span className="flex items-start text-start text-sm">{userName}</span>
      </Link>
      <div className="w-[294px] flex gap-1">
        <div className=" bg-gray-100 p-3 rounded-[5px] ml-[41px] text-base">
          {message}
        </div>
        <ChatNowTime time={time} />
      </div>
    </div>
  );
}

export default memo(ChatMessage);
