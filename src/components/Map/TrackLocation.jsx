import { memo } from 'react';

function TrackLocation({ onClick }) {
  return (
    <>
      <button onClick={onClick}>
        <svg className="w-10 h-10">
          <use href="/stack.svg#location" />
        </svg>
      </button>
    </>
  );
}

export default memo(TrackLocation);
