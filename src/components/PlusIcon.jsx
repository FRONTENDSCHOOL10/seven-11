import { func } from 'prop-types';
import { memo } from 'react';

PlusIcon.propTypes = {
  onClick: func,
};

function PlusIcon({ onClick }) {
  return (
    <button onClick={onClick} aria-label="첨부파일 추가">
      <svg className="w-6 h-6">
        <use href="/stack.svg#plus" />
      </svg>
    </button>
  );
}

export default memo(PlusIcon);
