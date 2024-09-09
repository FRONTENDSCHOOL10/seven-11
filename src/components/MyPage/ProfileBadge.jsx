import { oneOf } from 'prop-types';
import { memo } from 'react';

ProfileBadge.propTypes = {
  status: oneOf(['뉴비', '고인물', '화석']).isRequired,
};

function ProfileBadge({ status }) {
  return (
    <span className="text-sm text-secondary border border-secondary rounded-full px-1 flex items-center ">
      {status}
    </span>
  );
}

export default memo(ProfileBadge);
