import { string } from 'prop-types';

LocationTime.propTypes = {
  time: string.isRequired,
  location: string,
};

export default function LocationTime({ location, time }) {
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
