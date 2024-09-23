import { throttle } from '@/utils';
import { func, string, object } from 'prop-types';
import { memo } from 'react';

EditInput.propTypes = {
  placeholder: string,
  onChange: func,
  inputRef: object,
};

function EditInput({ placeholder, onChange, inputRef }) {
  const handleChange = throttle((e) => {
    const value = e.target.value;
    onChange(value);
  }, 1000);

  return (
    <input
      ref={inputRef}
      type="text"
      className="flex border border-gray-300 rounded-[8px] text-base flex-grow h-[37px] py-1 text-center placeholder-black"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}

export default memo(EditInput);
