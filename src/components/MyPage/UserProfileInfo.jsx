import { string } from 'prop-types';
import { memo } from 'react';

UserProfileInfo.propTypes = {
  title: string,
  info: string,
};

function UserProfileInfo({ title, info }) {
  return (
    <div className="flex text-base justify-between">
      <span>{title}</span>
      <span className="text-secondary">{info}</span>
    </div>
  );
}

export default memo(UserProfileInfo);
