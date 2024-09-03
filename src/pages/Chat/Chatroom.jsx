import ChatHeader from '@/components/Chat/ChatHeader';
import ChatBoard from './ChatBoard';
import { useParams } from 'react-router-dom';

export function Chatroom() {
    const { roomId } = useParams();
  return (
    <div>
      <ChatHeader title={'EUID 피그마 스터디 하실분~'} people={3} />
      <div>채팅방 ID: {roomId}</div>
      <ChatBoard />
    </div>
  );
}
