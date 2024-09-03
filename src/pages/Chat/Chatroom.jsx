import { useParams } from 'react-router-dom';

export function Chatroom() {
  const { roomId } = useParams();

  return <div>채팅방 ID: {roomId}</div>;
}
