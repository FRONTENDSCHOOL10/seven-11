import { string } from 'prop-types';

LocationTime.propTypes = {
  time: string.isRequired,
};

export default function LocationTime({ time }) {
  return <span className="text-gray-300 text-sm font-normal">{time}</span>;
}
