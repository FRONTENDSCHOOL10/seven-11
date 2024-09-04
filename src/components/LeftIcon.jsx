import { object, oneOfType, string } from 'prop-types';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

LeftIcon.propTypes = {
  to: oneOfType([string, object]),
};

function LeftIcon({ to }) {
  const navigate = useNavigate();

  const handlePreviousPage = (e) => {
    if (!to) {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <Link
      to={to || '#'}
      onClick={handlePreviousPage}
      aria-label="이전 페이지로 이동"
    >
      <svg className="w-5 h-5">
        <use href="/stack.svg#left" />
      </svg>
    </Link>
  );
}

export default memo(LeftIcon);
