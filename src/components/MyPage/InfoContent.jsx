import clsx from 'clsx';
import { bool, func, string } from 'prop-types';
import { Link } from 'react-router-dom';

InfoContent.propTypes = {
  children: string.isRequired,
  handleLogout: func,
  isMoreInfo: bool,
  userId: string,
};

function InfoContent({ children, handleLogout, isMoreInfo, userId }) {
  const showInfo = clsx(isMoreInfo ? '' : 'hidden');
  return (
    <Link onClick={handleLogout}>
      <div className="flex justify-between text-base">
        <span>{children}</span>
        <span className={`text-secondary ${showInfo}`}>{userId}</span>
      </div>
    </Link>
  );
}

export default InfoContent;
