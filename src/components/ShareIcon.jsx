import { memo } from 'react';

function ShareIcon() {
  return (
    <button aria-label="공유하기">
      <svg className="w-5 h-5">
        <use href="/stack.svg#share" />
      </svg>
    </button>
  );
}

export default memo(ShareIcon);
