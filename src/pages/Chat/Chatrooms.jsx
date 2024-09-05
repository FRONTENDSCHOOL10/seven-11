import { Helmet } from 'react-helmet-async';
import ChatList from './ChatList';

export function Component() {
  return (
    <div>
      <Helmet>
        <title>채팅</title>
      </Helmet>
      <ChatList />
    </div>
  );
}
