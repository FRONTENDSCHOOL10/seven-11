import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from './SearchIcon';

SearchBar.propTypes = {
  location: PropTypes.string.isRequired,
  inputColor: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onEnter: PropTypes.func, // 엔터키 입력 시 실행될 함수 prop 추가
};

export default function SearchBar({
  location,
  inputColor = 'bg-gray-100',
  onClick,
  onChange,
  onEnter,
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    onClick?.(inputRef.current.value); // 검색 버튼 클릭 시 input 값 전달
  };

  const handleInputChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onEnter?.(inputRef.current.value); // 엔터키 입력 시 input 값 전달
    }
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
        onChange={handleInputChange} // 입력값 변경 시 상태 업데이트
        onKeyDown={handleKeyDown} // 키 다운 이벤트 처리 (엔터키 입력 시)
      />
      <SearchIcon onClick={handleClick} />
    </div>
  );
}
