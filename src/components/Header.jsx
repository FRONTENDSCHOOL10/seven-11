import { memo } from 'react';
import SearchIcon from './SearchIcon';
import DownIcon from './DownIcon';
import AlarmIcon from './AlarmIcon';
import { bool, string } from 'prop-types';
import clsx from 'clsx';

Header.propTypes = {
  address: string.isRequired,
  isChatroom: bool.isRequired,
  isHiddenHeader: bool.isRequired,
};

function Header({ address, isChatroom, isHiddenHeader }) {
  const displayNone = clsx(isHiddenHeader ? 'hidden' : '');
  return (
    <header
      className={`flex justify-between items-center px-2.5 py-1.5 border-b border-gray-200 ${displayNone}`}
    >
      <div className="flex items-center space-x-2">
        {isChatroom ? (
          <span className="font-semibold text-lg">채팅</span>
        ) : (
          <>
            <span className="font-semibold text-lg">{address}</span>
            <DownIcon />
          </>
        )}
      </div>

      <div className="flex space-x-2">
        {!isChatroom && <SearchIcon to="/search" />}
        <AlarmIcon to="/" />
      </div>
    </header>
  );
}

export default memo(Header);
