import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import useChatListStore from '@/stores/useChatListStore';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import pb from '@/api/pb';
import {
  ChatBoard,
  ChatHeader,
  ChatModal,
  ChatNotice,
} from '@/components/Chat';
import { SendMessageBar } from '@/components';
import { getChatNoticeTime } from '@/utils';

export default function Chatroom() {
  const open = useChatListStore((s) => s.isOpenedModal);
  const { studyPosts, fetchStudyPosts } = useChatListStore((s) => ({
    studyPosts: s.studyPosts,
    fetchStudyPosts: s.fetchStudyPosts,
  }));
  const bgClass = clsx(open ? 'bg-[#46464699] opacity-65' : '');
  let { roomId } = useParams();

  if (roomId.includes('}')) {
    roomId = roomId.slice(0, -1);
  }

  const [room, setRoom] = useState({ user: [], roomName: '채팅방' });
  const [users, setUsers] = useState([]); // users 상태

  useEffect(() => {
    // 채팅방 정보 가져오기
    pb.collection('ChatRooms')
      .getOne(roomId)
      .then((record) => {
        setRoom(record);

        if (record.study) {
          fetchStudyPosts([record]);
        }

        if (record.user && record.user.length > 0) {
          fetchUsers(record.user); // 사용자 데이터 불러오기
        }
      });
  }, [roomId, fetchStudyPosts]);

  // 사용자 데이터를 fetch하는 함수
  const fetchUsers = async (userIds) => {
    try {
      const userRecords = await Promise.all(
        userIds.map((userId) => pb.collection('users').getOne(userId))
      );

      setUsers(userRecords);
    } catch (error) {
      console.error('사용자 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  const userCount = room.user ? room.user.length : 0;
  const roomTitle = room ? room.roomName : '채팅방';

  const studyPost = room.study ? studyPosts[room.study] : null;

  const authUser = pb.authStore.model;
  const authUserId = authUser?.id;

  // 메세지 전송
  const handleSend = async (message) => {
    try {
      const newMessage = await pb.collection('Chat_Messages').create({
        message,
        room: roomId,
        user: authUserId,
      });

      // Chatrooms 업데이트
      const roomData = await pb.collection('ChatRooms').getOne(roomId);

      const updatedMessages = [...(roomData.message || []), newMessage.id];

      await pb.collection('ChatRooms').update(roomId, {
        message: updatedMessages,
      });
    } catch (error) {
      console.error('메세지 전송 실패:', error);
    }
  };

  const creatTime = studyPost && getChatNoticeTime(studyPost.date);

  return (
    <>
      <Helmet>
        <title>{studyPost ? studyPost.title : '작심하루 - 채팅방'}</title>
        <meta
          name="description"
          content={
            studyPost
              ? `${studyPost.title}에 관한 채팅방입니다.`
              : '작심하루의 단체채팅방에서 다른 유저와 스터디 관련 이야기를 나누어보세요.'
          }
        />
      </Helmet>
      <div className={`w-full min-h-[630px] flex flex-col relative`}>
        <div className={`h-full flex-grow`}>
          <div className="fixed max-w-[430px] w-full">
            <ChatHeader
              title={studyPost ? studyPost.title : roomTitle}
              people={userCount}
            />
            <div className="px-3 flex justify-center pt-2 w-full">
              <ChatNotice
                notice={creatTime}
                linkTo={studyPost && `/home/study-detail/${studyPost.id}`}
              />
            </div>
          </div>

          <div className={`min-h-[690px] h-screen ${bgClass}`}>
            <div className="min-h-[500px] h-screen pt-[110px]">
              <ChatBoard roomId={roomId} users={users} studyPost={studyPost} />
            </div>
            <div className="fixed max-w-[428px] w-full bottom-0 bg-white px-2 ">
              <SendMessageBar
                onSend={handleSend}
                placeholder={'메세지 보내기'}
              />
            </div>
          </div>
        </div>
        <ChatModal
          isOpened={open}
          users={users}
          roomId={roomId.slice(0, -1)}
          authUserId={authUserId}
        />
      </div>
    </>
  );
}
