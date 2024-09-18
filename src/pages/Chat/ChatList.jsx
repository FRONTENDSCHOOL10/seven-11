import { useEffect } from 'react';
import { getTimeDifference } from '@/utils/getTimeDifference';
import useChatListStore from '@/stores/useChatListStore';
import { Chat } from '@/components/Chat';
import FadeLoader from 'react-spinners/FadeLoader';
export default function ChatList() {
  const {
    chatList,
    studyPosts,
    loading,
    error,
    fetchChatList,
    fetchStudyPosts,
  } = useChatListStore((s) => ({
    chatList: s.chatList,
    studyPosts: s.studyPosts,
    loading: s.loading,
    error: s.error,
    fetchChatList: s.fetchChatList,
    fetchStudyPosts: s.fetchStudyPosts,
  }));

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
    if (chatList.length > 0) {
      fetchStudyPosts(chatList);
    }
  }, [chatList, fetchStudyPosts]);

  if (loading)
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
  if (error) return <p>데이터 가져오기를 실패했습니다.: {error.message}</p>;

  return (
    <ul>
      {chatList.map(({ message, id, updated, study }) => {
        const studyPost = study ? studyPosts[study] : null;

        return (
          <Chat
            key={id}
            id={id}
            text={message}
            imgURL="/chatIcon.svg"
            updateTime={getTimeDifference(updated)}
            roomName={studyPost ? studyPost.title : '채팅방'}
          />
        );
      })}
    </ul>
  );
}
