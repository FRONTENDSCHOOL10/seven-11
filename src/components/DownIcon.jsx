import { func } from 'prop-types';
import { memo } from 'react';

DownIcon.propTypes = {
  onClick: func,
};

function DownIcon({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <svg className="w-5 h-5">
        <use href="/stack.svg#down" />
      </svg>
    </button>
  );
}

export default memo(DownIcon);
