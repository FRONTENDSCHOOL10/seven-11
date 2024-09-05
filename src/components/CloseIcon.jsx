import { func } from 'prop-types';
import { memo } from 'react';

CloseIcon.propTypes = {
  onClick: func,
};

function CloseIcon({ onClick }) {
  return (
    <button onClick={onClick} aria-label="닫기">
      <svg className="w-5 h-5">
        <use href="/stack.svg#close" />
      </svg>
    </button>
  );
}

export default memo(CloseIcon);
