import { string } from 'prop-types';
import SearchIcon from './SearchIcon';

SearchBar.propTypes = {
  location: string.isRequired,
};

export default function SearchBar({ location }) {
  return (
    <div className="w-[293px] h-[34px] flex gap-1 items-center bg-gray-100 px-2.5 py-1.5 rounded-md">
      <input
        type="text"
        placeholder={location}
        className="bg-transparent text-gray-400 w-full focus:outline-none"
      />
      <SearchIcon />
    </div>
  );
}
