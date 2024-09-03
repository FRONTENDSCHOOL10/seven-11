import ChatMessage from './ChatMessage';
import SentChat from '../../pages/Chat/SentChat';
import ChatTime from '../../pages/Chat/ChatTime';
import { memo } from 'react';

function ChatBoard() {
  return (
    <div className="flex flex-col gap-2 px-3">
      <ChatMessage
        message={
          '안녕하세요 교수님. 저는 어쩌구학과 어쩌구학번 박윤선이라고 합니다.'
        }
        time={'오후 7:16'}
        userImg={'/favicon.svg'}
        userName={'박윤선'}
        id="1"
      />
      <ChatTime time={'2024년 9월 3일'} />
      <SentChat time={'오후 7:16'} message={'그러세요 그럼'} />
    </div>
  );
}

export default memo(ChatBoard);
