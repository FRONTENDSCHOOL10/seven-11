import ChatHeader from '@/components/Chat/ChatHeader';
import ChatBoard from '../../components/Chat/ChatBoard';
import { useParams } from 'react-router-dom';
import ChatModal from '@/components/Chat/ChatModal';

export function Chatroom() {
  const { roomId } = useParams();
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#46464699] opacity-65 flex-grow">
        <ChatHeader title={'EUID 피그마 스터디 하실분~'} people={3} />
        <div>채팅방 ID: {roomId}</div>
        <ChatBoard />
      </div>
      <ChatModal />
    </div>
  );
}
