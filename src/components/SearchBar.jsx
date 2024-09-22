import { func, string } from 'prop-types';
import SearchIcon from './SearchIcon';
import { useRef } from 'react';

SearchBar.propTypes = {
  location: string.isRequired,
  inputColor: string,
  onClick: func,
};

export default function SearchBar({
  location,
  inputColor = 'bg-gray-100',
  onClick,
}) {
  const inputRef = useRef(null);
  const handleClick = () => {
    onClick?.(inputRef.current.value);
  };
  return (
    <div
      className={`min-w-[293px] w-full h-[34px] flex gap-1 items-center text-gray-400 px-2.5 py-1.5 rounded-md ${inputColor}`}
    >
      <input
        type="text"
        placeholder={location}
        className={`bg-transparent w-full focus:outline-none text-gray-400`}
        ref={inputRef}
        defaultValue={''}
      />
      <SearchIcon onClick={handleClick} />
    </div>
  );
}
