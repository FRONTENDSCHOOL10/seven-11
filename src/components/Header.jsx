import { memo } from 'react';
import SearchIcon from './SearchIcon';
import DownIcon from './DownIcon';
import AlarmIcon from './AlarmIcon';

function Header() {
  return (
    <header className="flex justify-between items-center px-2.5 py-1.5 border-b  border-gray-200 ">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-lg">남가좌제2동</span>
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
