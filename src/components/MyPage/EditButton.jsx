import { func, string } from 'prop-types';
import { memo } from 'react';

EditButton.propTypes = {
  onClick: func,
  children: string,
};
function EditButton({ onClick, children }) {
  return (
    <button
      type="button"
      className="py-1 px-[34px] border border-gray-300 rounded-[8px] text-base w-[143.5px] font-semibold"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(EditButton);
