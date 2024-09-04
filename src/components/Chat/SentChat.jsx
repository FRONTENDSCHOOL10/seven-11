import { memo } from 'react';
import ChatNowTime from '../../components/Chat/ChatNowTime';
import { string } from 'prop-types';

SentChat.propTypes = {
  time: string.isRequired,
  message: string.isRequired,
};

function SentChat({ time, message }) {
  return (
    <div className="flex flex-row gap-1 justify-end">
      <ChatNowTime time={time} />
      <p className="bg-primary text-white p-3 rounded-[5px] text-base">
        {message}
      </p>
    </div>
  );
}

export default memo(SentChat);
