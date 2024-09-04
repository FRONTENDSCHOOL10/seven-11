import { func } from 'prop-types';
import { memo } from 'react';

PlusIcon.propTypes = {
  onClick: func,
};

function PlusIcon({ onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button onClick={handleClick} aria-label="첨부파일 추가">
      <svg className="w-6 h-6">
        <use href="/stack.svg#plus" />
      </svg>
    </button>
  );
}

export default memo(PlusIcon);
