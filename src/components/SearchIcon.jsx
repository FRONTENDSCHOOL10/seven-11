import { object, oneOfType, string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

SearchIcon.propTypes = {
  to: oneOfType([string, object]).isRequired,
};

function SearchIcon({ to }) {
  return (
    <Link to={to}>
      <svg className="w-6 h-6">
        <use href="/stack.svg#search" />
      </svg>
    </Link>
  );
}

export default memo(SearchIcon);
