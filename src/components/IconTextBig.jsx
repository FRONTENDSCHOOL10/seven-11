import { string } from 'prop-types';
import { memo } from 'react';

IconTextBig.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
};

function IconTextBig({ icon, text }) {
  return (
    <div className="flex items-center space-x-2">
      <svg className="w-5 h-5">
        <use href={`/stack.svg#${icon}`} />
      </svg>
      <span className="text-base font-normal">{text}</span>
    </div>
  );
}

export default memo(IconTextBig);
