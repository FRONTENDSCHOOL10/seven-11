import { string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

BackIcon.propTypes = {
  to: string,
};

function BackIcon({ to }) {
  return (
    <Link to={to}>
      <svg className="w-5 h-5">
        <use href="/stack.svg#left" />
      </svg>
    </Link>
  );
}

export default memo(BackIcon);
