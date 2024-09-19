import { memo } from 'react';
import ChatUser from './ChatUser';
import ChatExitNav from './ChatExitNav';
import clsx from 'clsx';
import { array, bool, string } from 'prop-types';
import CancelIcon from './CancelIcon';
import pb from '@/api/pb';
import { useNavigate } from 'react-router-dom';

ChatModal.propTypes = {
  isOpened: bool.isRequired,
  users: array,
  roomId: string,
  authUserId: string,
};

function ChatModal({ isOpened, users, roomId, authUserId }) {
  const display = clsx(isOpened ? '' : 'hidden');
  const navigate = useNavigate();

  // Chatroom에서 사용자를 제거하는 함수
  const handleExit = async () => {
    if (confirm('채팅방을 나가시겠습니까?')) {
      try {
        const roomData = await pb.collection('ChatRooms').getOne(roomId);

        const updatedUsers = roomData.user.filter(
          (userId) => userId !== authUserId
        );

        // 업데이트된 user 배열을 ChatRooms에 업데이트
        await pb.collection('ChatRooms').update(roomId, {
          user: updatedUsers,
        });

        console.log(`${authUserId}님이 채팅방을 나갔습니다.`);
        navigate(-1);
      } catch (error) {
        console.error('채팅방에서 유저 데이터 삭제를 실패했습니다.:', error);
      }
    }
  };

  return (
    <div className={`${display} fixed bg-white w-[266px] h-[698px] translate-x-[52.5px]`}>
      <div className="flex flex-row justify-between border-b p-2">
        <h3 className="text-[14px]">참여중인 이웃</h3>
        <CancelIcon />
      </div>
      {users.map((user) => {
        return (
          <ChatUser
            key={user.id}
            userName={user.nickname}
            userImg={pb.files.getUrl(user, user.avatar)}
          />
        );
      })}
      <ChatExitNav handleExit={handleExit} />
    </div>
  );
}

export default memo(ChatModal);
