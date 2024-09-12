import { object, oneOfType, string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

AlarmIcon.propTypes = {
  to: oneOfType([string, object]).isRequired,
};

function AlarmIcon({ to }) {
  return (
    <Link to={to}>
      <svg className="w-6 h-6">
        <use href="/stack.svg#alarmBell" />
      </svg>
    </Link>
  );
}

export default memo(AlarmIcon);
