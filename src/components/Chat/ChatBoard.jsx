import ChatMessage from './ChatMessage';
import SentChat from '../../pages/Chat/SentChat';
import ChatTime from '../../pages/Chat/ChatTime';
import { memo } from 'react';
import ChatNotice from '@/components/Chat/ChatNotice';

function ChatBoard() {
  return (
    <div className="flex flex-col gap-2 px-3">
      <ChatNotice />
      <ChatTime time={'2024년 8월 15일'} />
      <ChatMessage
        message={
          '안녕하세요 교수님. 졸업 안시켜주면 한강 다이브쇼를 하겠습니다.'
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
