import { memo, useEffect, useState } from 'react';
import pb from '@/api/pb';
import {
  getChatNoticeTime,
  getChatTime,
  getChatUpdateTime,
} from '@/utils/getChatTime';
import { string, array, object } from 'prop-types';
import {
  ChatMessage,
  ChatNotice,
  ChatTime,
  SentChat,
} from '@/components/Chat/';

ChatBoard.propTypes = {
  roomId: string,
  users: array,
  studyPost: object,
};

function ChatBoard({ roomId, users, studyPost }) {
  const creatTime = studyPost && getChatNoticeTime(studyPost.created);
  const [messages, setMessages] = useState([]);

  // 채팅 메시지 불러오기
  useEffect(() => {
    pb.collection('Chat_Messages')
      .getFullList({
        sort: 'created',
        filter: `room="${roomId}"`,
      })
      .then((records) => {
        setMessages(records);
      });

    const unsubscribe = pb.collection('Chat_Messages').subscribe('*', (e) => {
      if (e.action === 'create') {
        setMessages((prevMessages) => [...prevMessages, e.record]);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [roomId]);

  const authUser = pb.authStore.model;
  const authUserId = authUser?.id;

  return (
    <div className="flex flex-col gap-2 px-3">
      <ChatNotice
        notice={creatTime}
        linkTo={studyPost && `/home/study-detail/${studyPost.id}`}
      />
      {messages.map((message) => {
        const user = users.find((user) => user.id === message.user); // users 배열에서 사용자 찾기

        if (message.user === authUserId) {
          return (
            <div key={message.id}>
              <ChatTime time={getChatUpdateTime(message.created)} />
              <SentChat
                time={getChatTime(message.created)}
                message={message.message}
              />
            </div>
          );
        }

        return (
          <div key={message.id}>
            <ChatTime time={getChatUpdateTime(message.created)} />
            <ChatMessage
              message={message.message}
              time={getChatTime(message.created)}
              userImg={
                user ? pb.files.getUrl(user, user.avatar) : '/favicon.svg'
              }
              userName={user ? user.nickname : '알 수 없음'}
              id={message.user}
            />
          </div>
        );
      })}
    </div>
  );
}

export default memo(ChatBoard);
