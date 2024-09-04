import { memo } from 'react';
import { Link } from 'react-router-dom';

function ContentNav() {
  return (
    <Link className="flex justify-between p-4 items-center border-b">
      <span className="text-base font-semibold">찜한 목록</span>
      <svg className={`w-4 h-4`}>
        <use href={`/stack.svg#right`} />
      </svg>
    </Link>
  );
}

export default memo(ContentNav);
