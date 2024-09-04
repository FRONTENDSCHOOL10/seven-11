import { func } from 'prop-types';
import { memo } from 'react';

ChatExitNav.propTypes = {
  handleExit: func,
};

function ChatExitNav({ handleExit }) {
  return (
    <div className="exit">
      <button type="button" onClick={handleExit}>
        <svg className="w-[26px] h-[26px]">
          <use href="/stack.svg#exit" />
        </svg>
      </button>
      <div className="flex gap-4">
        <button type="button">
          <svg className="w-[26px] h-[26px]">
            <use href="/stack.svg#chatAlarm" />
          </svg>
        </button>
        <button type="button">
          <svg className="w-[26px] h-[26px]">
            <use href="/stack.svg#setting" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default memo(ChatExitNav);
