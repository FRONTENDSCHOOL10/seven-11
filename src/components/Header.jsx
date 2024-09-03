import { memo } from 'react';
import SearchIcon from './SearchIcon';
import DownIcon from './DownIcon';
import AlarmIcon from './AlarmIcon';
import { string } from 'prop-types';

Header.propTypes = {
  address: string.isRequired,
};

function Header({ address }) {
  return (
    <header className="flex justify-between items-center px-2.5 py-1.5 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-lg">{address}</span>
        <DownIcon />
      </div>

      <div className="flex space-x-2">
        <SearchIcon to="/search" />
        <AlarmIcon to="/" />
      </div>
    </header>
  );
}

export default memo(Header);
