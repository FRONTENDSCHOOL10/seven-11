import { func } from 'prop-types';
import { memo } from 'react';
TrackLocation.propTypes = {
  onClick: func,
};

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
