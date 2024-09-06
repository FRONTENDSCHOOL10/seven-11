import { useEffect } from 'react';
import Chat from '@/components/Chat/Chat';
import { getTimeDifference } from '@/utils/getTimeDifference';
import useChatListStore from '@/stores/useChatListStore';

export default function ChatList() {
  const { chatList, loading, error, fetchChatList } = useChatListStore();

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>데이터 가져오기를 실패했습니다.: {error.message}</p>;

  return (
    <ul>
      {chatList.map(({ roomName, message, id, created }) => (
        <Chat
          key={id}
          id={id}
          roomName={roomName}
          text={message}
          imgURL="/chatIcon.svg"
          updateTime={getTimeDifference(created)}
        />
      ))}
    </ul>
  );
}
