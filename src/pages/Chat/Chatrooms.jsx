import { Helmet } from 'react-helmet-async';
import ChatList from './ChatList';

export function Component() {
  return (
    <>
      <Helmet>
        <title>채팅</title>
      </Helmet>
      <h1>채팅페이지</h1>
      <ChatList />
    </>
  );
}
