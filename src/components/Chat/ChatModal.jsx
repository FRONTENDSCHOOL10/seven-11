import { memo, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import pb from '@/api/pb';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import CancelIcon from './CancelIcon';
import { array, bool, string } from 'prop-types';
import ChatExitNav from './ChatExitNav';
import ChatUser from './ChatUser';

ChatModal.propTypes = {
  isOpened: bool.isRequired,
  users: array,
  roomId: string,
  authUserId: string,
};

function ChatModal({ isOpened, users, roomId, authUserId }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const [wasOpened, setWasOpened] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!wasOpened && isOpened) {
      setWasOpened(true);
    }

    if (isOpened && wasOpened) {
      setIsAnimating(true);
      gsap.fromTo(
        modalRef.current,
        { x: '100%' },
        {
          x: '0%',
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => setIsAnimating(false),
        }
      );
    } else if (!isOpened && wasOpened) {
      setIsAnimating(true);
      gsap.to(modalRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => setIsAnimating(false),
      });
    }
  }, [isOpened, wasOpened]);


  const handleExit = async () => {
    if (confirm('채팅방을 나가시겠습니까?')) {
      try {
        const roomData = await pb.collection('ChatRooms').getOne(roomId);

        const updatedUsers = roomData.user.filter(
          (userId) => userId !== authUserId
        );

        await pb.collection('ChatRooms').update(roomId, {
          user: updatedUsers,
        });

        navigate(-1);
      } catch (error) {
        console.error('채팅방에서 유저 데이터 삭제를 실패했습니다.:', error);
      }
    }
  };

  return (
    <div
      ref={modalRef}
      className={clsx(
        'bg-white w-[266px] h-screen absolute top-0 right-0 z-50',
        {
          hidden: !isOpened && !isAnimating,
        }
      )}
    >
      <div className="flex flex-row justify-between border-b p-2">
        <h3 className="text-[14px]">참여중인 이웃</h3>
        <CancelIcon />
      </div>
      {users.map((user) => (
        <ChatUser
          key={user.id}
          userName={user.nickname}
          userImg={
            user.avatar ? pb.files.getUrl(user, user.avatar) : '/favicon.svg'
          }
          userLink={`/profile/${user.id}`}
        />
      ))}
      <ChatExitNav handleExit={handleExit} />
    </div>
  );
}

export default memo(ChatModal);
