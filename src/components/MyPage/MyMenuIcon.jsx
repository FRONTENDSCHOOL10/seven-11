import { string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

MyMenuIcon.propTypes = {
  iconTitle: string.isRequired,
  iconId: string.isRequired,
};

function MyMenuIcon({ iconTitle, iconId }) {
  return (
    <Link className="flex flex-col gap-[6px] items-center">
      <svg className={`w-[26px] h-[26px] `}>
        <use href={`/stack.svg#${iconId}`} />
      </svg>
      <span className="text-sm font-semibold">{iconTitle}</span>
    </Link>
  );
}

export default memo(MyMenuIcon);