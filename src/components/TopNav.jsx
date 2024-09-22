import { memo, useState } from 'react';
import LeftIcon from './LeftIcon';
import ShareIcon from './ShareIcon';
import MoreIcon from './MoreIcon';
import CloseIcon from './CloseIcon';
import MoreModal from './MoreModal';
import { string } from 'prop-types';

TopNav.propTypes = {
  to: string,
};

function TopNav({ to }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMoreIconClick = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="relative w-full px-4 py-2 flex items-center justify-between">
        <LeftIcon to={to} />

        <div className=" flex gap-3">
          <ShareIcon />

          {isModalVisible ? (
            <CloseIcon onClick={handleMoreIconClick} />
          ) : (
            <MoreIcon onClick={handleMoreIconClick} />
          )}
        </div>
        <MoreModal isVisible={isModalVisible} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export default memo(TopNav);
