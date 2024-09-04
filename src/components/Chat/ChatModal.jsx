import { memo } from 'react';
import ChatUser from './ChatUser';
import ChatExitNav from './ChatExitNav';
import clsx from 'clsx';
import { bool } from 'prop-types';

ChatModal.propTypes = {
  isOpened: bool.isRequired,
};

function ChatModal({ isOpened }) {
  const display = clsx(isOpened ? '' : 'hidden');

  return (
    <div
      className={`${display} absolute bg-white w-[266px] h-full top-0 right-0`}
    >
      <h3 className="text-[14px] border-b p-2">참여중인 이웃</h3>
      <ChatUser userName="박윤선" userImg="/favicon.svg" />
      <ChatExitNav />
    </div>
  );
}

export default memo(ChatModal);
