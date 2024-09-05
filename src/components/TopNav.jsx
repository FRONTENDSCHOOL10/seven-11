import { memo } from 'react';
import LeftIcon from './LeftIcon';
import ShareIcon from './ShareIcon';
import MoreIcon from './MoreIcon';

function TopNav() {
  return (
    <>
      <div className="w-full px-4 py-2 flex items-center justify-between">
        <LeftIcon />

        <div className="flex gap-3">
          <ShareIcon />
          <MoreIcon />
        </div>
      </div>
    </>
  );
}

export default memo(TopNav);
