import { string } from 'prop-types';
import { memo } from 'react';

EditInput.propTypes = {
  placeholder: string,
};

function EditInput({ placeholder }) {
  return (
    <input
      type="text"
      className="flex border border-gray-300 rounded-[8px] text-base flex-grow h-[37px] py-1 text-center placeholder-black"
      placeholder={placeholder}
    />
  );
}

export default memo(EditInput);
