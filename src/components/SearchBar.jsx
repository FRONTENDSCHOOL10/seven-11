import { func, string } from 'prop-types';
import SearchIcon from './SearchIcon';
import { useRef } from 'react';

SearchBar.propTypes = {
  location: string.isRequired,
  inputColor: string,
  onChange: func,
};

export default function SearchBar({
  location,
  inputColor = 'bg-gray-100',
  onChange,
}) {
  const inputRef = useRef(null);

  const handleInput = () => {
    onChange?.(inputRef.current.value);
  };

  return (
    <div
      className={`w-full h-[34px] flex gap-1 items-center text-gray-400 px-2.5 py-1.5 rounded-md ${inputColor}`}
    >
      <input
        type="text"
        placeholder={location}
        className={`bg-transparent w-full focus:outline-none text-gray-400`}
        ref={inputRef}
        onChange={handleInput} // 실시간 입력값 변경
      />
      <SearchIcon onClick={handleInput} />
    </div>
  );
}
