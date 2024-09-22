import { number, oneOfType, string } from 'prop-types';
import { memo } from 'react';

UserProfileInfo.propTypes = {
  title: string,
  info: oneOfType([string, number]),
};

function UserProfileInfo({ title, info }) {
  return (
    <div className="flex text-base justify-between">
      <span>{title}</span>
      <span className="text-secondary">{info ? info : ''}</span>
    </div>
  );
}

export default memo(UserProfileInfo);
