import { node, string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

ProfileHeader.propTypes = {
  children: node.isRequired,
  to: string,
};

function ProfileHeader({ children, to }) {
  return (
    <div className="flex flex-row items-center justify-between p-[14px] border-b border-gray-300">
      <h2 className="font-semibold text-base">{children}</h2>
      <Link
        to={to}
        type="button"
        aria-label={`${children} 닫기`}
        title={`${children} 닫기`}
      >
        <svg className="w-4 h-4">
          <use href="/stack.svg#close" />
        </svg>
      </Link>
    </div>
  );
}

export default memo(ProfileHeader);
