import { func } from 'prop-types';
import { memo } from 'react';

SendIcon.propTypes = {
  onClick: func,
};

function SendIcon({ onClick }) {
  const handleSend = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button className="ml-2" onClick={handleSend} aria-label="메시지 보내기">
      <svg className="w-[18px] h-[18px]">
        <use href="/stack.svg#send" />
      </svg>
    </button>
  );
}

export default memo(SendIcon);
