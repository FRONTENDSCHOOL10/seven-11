import { memo, useEffect, useState } from 'react';
import pb from '@/api/pb';
import {
  getChatTime,
  getChatUpdateTime,
  isSameDate,
} from '@/utils/getChatTime';
import { string, array, object } from 'prop-types';
import {
  ChatMessage,
  ChatTime,
  SentChat,
} from '@/components/Chat/';

ChatBoard.propTypes = {
  roomId: string,
  users: array,
  studyPost: object,
};

function ChatBoard({ roomId, users }) {
  const [messages, setMessages] = useState([]);

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

  let lastMessageDate = null;

  return (
    <div className="flex flex-col gap-2 px-3 pb-20">
      {messages.map((message) => {
        const user = users.find((user) => user.id === message.user);
        const currentMessageDate = new Date(message.created);

        const showChatTime =
          !lastMessageDate || !isSameDate(lastMessageDate, currentMessageDate);
        lastMessageDate = currentMessageDate;

        return (
          <div key={message.id}>
            {showChatTime && (
              <ChatTime time={getChatUpdateTime(message.created)} />
            )}
            {message.user === authUserId ? (
              <SentChat
                time={getChatTime(message.created)}
                message={message.message}
              />
            ) : (
              <ChatMessage
                message={message.message}
                time={getChatTime(message.created)}
                userImg={
                  user ? pb.files.getUrl(user, user.avatar) : '/favicon.svg'
                }
                userName={user ? user.nickname : '알 수 없음'}
                id={message.user}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(ChatBoard);
