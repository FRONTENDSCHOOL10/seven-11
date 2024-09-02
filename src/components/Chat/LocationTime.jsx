import { string } from 'prop-types';

LocationTime.propTypes = {
  location: string.isRequired,
  time: string.isRequired,
};

export default function LocationTime({ location, time }) {
  return (
    <span className="text-gray-300 text-sm">
      {location}
      {' • '}
      {time}
    </span>
  );
}
