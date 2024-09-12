import { Helmet } from 'react-helmet-async';
import ChatList from './ChatList';

export function Component() {
  return (
    <div>
      <Helmet>
        <title>작심하루 - 채팅목록</title>
        <meta
          name="description"
          content="채팅방 목록을 확인하고 다른 유저와 대화해보세요."
        />
      </Helmet>
      <ChatList />
    </div>
  );
}
