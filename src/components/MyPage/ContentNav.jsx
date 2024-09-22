import clsx from 'clsx';
import { bool, string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

ContentNav.propTypes = {
  title: string,
  isSvgHidden: bool,
};

function ContentNav({ title, isSvgHidden }) {
  const svgClass = clsx(isSvgHidden ? 'hidden' : '');
  return (
    <Link className="flex justify-between p-4 items-center border-b">
      <span className="text-base font-semibold">{title}</span>

      <svg className={`w-4 h-4 ${svgClass}`}>
        <use href={`/stack.svg#right`} />
      </svg>
    </Link>
  );
}

export default memo(ContentNav);
