import { string } from 'prop-types';
import { memo } from 'react';

ChatTime.propTypes = {
  time: string.isRequired,
};

function ChatTime({ time }) {
  return (
    <div className="flex justify-center text-gray-300 text-sm">{time}</div>
  );
}

export default memo(ChatTime);
