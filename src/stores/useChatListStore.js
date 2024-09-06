import { create } from 'zustand';
import pb from '../api/pb.js';

const useChatListStore = create((set) => ({
  chatList: [],
  loading: false,
  error: null,
  isOpenedModal: false,

  fetchChatList: async () => {
    set({ loading: true, error: null });
    try {
      const chatRooms = await pb.collection('ChatRooms').getFullList({
        sort: '-created',
      });

      const newChatList = await Promise.all(
        chatRooms.map(async (chatRoom) => {
          const lastMessageId = chatRoom.message[chatRoom.message.length - 1];
          const lastMessage = await pb
            .collection('Chat_Messages')
            .getOne(lastMessageId);

          return {
            ...chatRoom,
            message: lastMessage.message,
          };
        })
      );

      set({ chatList: newChatList, loading: false });
    } catch (error) {
      console.error('채팅 메시지 데이터를 가져오는 데 실패했습니다:', error);
    }
  },

  setModalOpen: () => {
    set({ isOpenedModal: true });
    console.log('모달 오픈!');
  },

  setModalClose: () => {
    set({ isOpenedModal: false });
  },
}));

export default useChatListStore;
