import { func } from 'prop-types';
import { memo } from 'react';

HamburgerIcon.propTypes = {
  onClick: func,
};

function HamburgerIcon({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <svg className="w-5 h-5">
        <use href="/stack.svg#hamburger" />
      </svg>
    </button>
  );
}

export default memo(HamburgerIcon);
