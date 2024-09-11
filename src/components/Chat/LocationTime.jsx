import { string } from 'prop-types';
import { memo } from 'react';

LocationTime.propTypes = {
  time: string.isRequired,
  location: string,
};

function LocationTime({ location, time }) {
  return (
    <div className="flex text-gray-400 text-sm font-normal">
      {location ? (
        <div>
          <span>{location}</span>
          {'•'}
        </div>
      ) : null}
      <span>{time}</span>
    </div>
  );
}

export default memo(LocationTime);
