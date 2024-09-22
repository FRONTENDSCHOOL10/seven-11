import { func, string } from 'prop-types';
import SearchIcon from './SearchIcon';
import { useRef } from 'react';

SearchBar.propTypes = {
  location: string.isRequired,
  inputColor: string,
  onClick: func,
  onChange: func, // 추가: onChange prop 타입 정의
};

export default function SearchBar({
  location,
  inputColor = 'bg-gray-100',
  onClick,
  onChange, // 추가: onChange prop 전달
}) {
  const inputRef = useRef(null);
  const handleClick = () => {
    onClick?.(inputRef.current.value);
  };

  // 추가: 입력이 변경될 때 onChange 호출
  const handleInputChange = (event) => {
    onChange?.(event.target.value);
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
        onChange={handleInputChange} // 추가: onChange 이벤트 핸들러
      />
      <SearchIcon onClick={handleClick} />
    </div>
  );
}
