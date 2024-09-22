import { func, string } from 'prop-types';
import SearchIcon from './SearchIcon';
import { useRef, useState } from 'react';

SearchBar.propTypes = {
  location: string.isRequired,
  inputColor: string,
  onChange: func, // onChange 함수 prop 추가
};

export default function SearchBar({
  location,
  inputColor = 'bg-gray-100',
  onChange,
}) {
  const [searchTerm, setSearchTerm] = useState(''); // 로컬 상태로 검색어 관리
  const inputRef = useRef(null);

  // 입력값이 변경될 때 로컬 상태 업데이트
  const handleInputChange = () => {
    setSearchTerm(inputRef.current.value);
  };

  // SearchIcon 클릭 시 부모 컴포넌트에 전달
  const handleSearchClick = () => {
    onChange?.(searchTerm); // 검색어 전달
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
        onChange={handleInputChange} // 입력값 변경 시 로컬 상태 업데이트
      />
      <SearchIcon onClick={handleSearchClick} />{' '}
      {/* 아이콘 클릭 시 검색어 전달 */}
    </div>
  );
}
