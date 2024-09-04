import { object, oneOfType, string, func } from 'prop-types';
import { memo } from 'react';

SearchIcon.propTypes = {
  to: oneOfType([string, object]),
  onClick: func,
};

function SearchIcon({ to, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a href={to || '#'} onClick={handleClick}>
      <svg className="w-6 h-6">
        <use href="/stack.svg#search" />
      </svg>
    </a>
  );
}

export default memo(SearchIcon);
