import { string } from 'prop-types';
import { memo } from 'react';

IconTextSmall.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
};

function IconTextSmall({ icon, text }) {
  return (
    <div className="flex items-center space-x-2">
      <svg className="w-[14px] h-[14px]">
        <use href={`/stack.svg#${icon}`} />
      </svg>
      <span className="text-base font-normal">{text}</span>
    </div>
  );
}

export default memo(IconTextSmall);