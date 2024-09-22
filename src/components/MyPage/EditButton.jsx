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
      className="flex-grow py-1 border border-gray-300 rounded-[8px] text-base font-semibold"
      onClick={onClick}
    >
      {children}
    </button>
  );
}


export default memo(EditButton);
