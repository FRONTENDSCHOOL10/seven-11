import { object, oneOfType, string, func } from 'prop-types';
import { memo } from 'react';

SearchIcon.propTypes = {
  to: oneOfType([string, object]),
  onClick: func, // 클릭 시 이벤트 핸들러 함수 전달
};

function SearchIcon({ to, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(); // 클릭 시 부모 컴포넌트의 onClick 실행
    }
  };

  return (
    <a href={to || '#'} onClick={handleClick} aria-label="검색 페이지로 이동">
      <svg className="w-6 h-6">
        <use href="/stack.svg#search" />
      </svg>
    </a>
  );
}

export default memo(SearchIcon);
