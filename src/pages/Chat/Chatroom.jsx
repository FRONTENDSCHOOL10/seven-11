import ChatHeader from '@/components/Chat/ChatHeader';
import ChatBoard from '../../components/Chat/ChatBoard';
import { useParams } from 'react-router-dom';
import ChatModal from '@/components/Chat/ChatModal';
import clsx from 'clsx';
import useChatListStore from '@/stores/useChatListStore';
import SendMessageBar from '@/components/SendMessageBar';
import { Helmet } from 'react-helmet-async';

export default function Chatroom() {
  const open = useChatListStore((s) => s.isOpenedModal);
  const bgClass = clsx(open ? 'bg-[#46464699] opacity-65' : '');
  const { roomId } = useParams();

  return (
    <>
      <Helmet>
        <title>작심하루 - 채팅방</title>
        <meta
          name="description"
          content="작심하루의 단체채팅방에서 다른 유저와 스터디 관련 이야기를 나누어보세요."
        />
      </Helmet>
      <div className="h-full flex flex-col">
        <div className={`${bgClass} flex-grow`}>
          <ChatHeader title={'EUID 피그마 스터디 하실분~'} people={3} />
          <div>채팅방 ID: {roomId}</div>
          <ChatBoard />

          <div className="absolute bottom-0 left-0 w-full">
            <SendMessageBar />
          </div>
        </div>
        <ChatModal isOpened={open} />
      </div>
    </>
  );
}
