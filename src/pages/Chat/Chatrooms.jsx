import Chat from '@/components/Chat/Chat';
import { Link } from 'react-router-dom';

export function Component() {
  return (
    <>
      <h1>채팅페이지</h1>
      <Link to={'/home/chat/:roomId'}>채팅방 이동</Link>
      <Chat />
    </>
  );
}
