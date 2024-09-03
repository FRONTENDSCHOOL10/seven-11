import { string } from 'prop-types';
import { memo } from 'react';

ChatNowTime.propTypes = {
  time: string.isRequired,
};

function ChatNowTime({ time }) {
  return (
    <span className="text-sm whitespace-nowrap flex items-end text-gray-300">
      {time}
    </span>
  );
}

export default memo(ChatNowTime);
