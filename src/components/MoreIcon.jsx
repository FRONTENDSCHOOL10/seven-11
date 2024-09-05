import { func } from 'prop-types';
import { memo } from 'react';

MoreIcon.propTypes = {
  onClick: func,
};

function MoreIcon({ onClick }) {
  return (
    <button onClick={onClick} aria-label="설정 메뉴">
      <svg className="w-5 h-5">
        <use href="/stack.svg#more" />
      </svg>
    </button>
  );
}

export default memo(MoreIcon);
