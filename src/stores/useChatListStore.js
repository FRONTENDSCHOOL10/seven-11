import { create } from 'zustand';
import pb from '../api/pb.js';

const useChatListStore = create((set) => ({
  chatList: [], // 채팅 리스트 상태
  studyPosts: {}, // 채팅방과 연결된 스터디 게시글 상태
  loading: false, // 채팅리스트 loading
  error: null,
  isOpenedModal: false, // 모달창 상태 관리

  // 채팅 리스트 상태 업데이트
  fetchChatList: async () => {
    set({ loading: true, error: null });
    try {
      const authId = pb.authStore.model.id;

      // 모든 채팅방을 가져옴
      const chatRooms = await pb.collection('ChatRooms').getFullList({
        sort: '-updated',
      });

      // 클라이언트 측에서 authId가 포함된 채팅방만 필터링
      const filteredChatList = chatRooms.filter((chatRoom) =>
        chatRoom.user.includes(authId)
      );

      const newChatList = await Promise.all(
        filteredChatList.map(async (chatRoom) => {
          const lastMessageId =
            chatRoom.message.length > 0
              ? chatRoom.message[chatRoom.message.length - 1]
              : null;

          if (!lastMessageId) {
            return {
              ...chatRoom,
              message: '',
            };
          }

          let lastMessage = await pb
            .collection('Chat_Messages')
            .getOne(lastMessageId);
          lastMessage = lastMessage ? lastMessage.message : '';

          return {
            ...chatRoom,
            message: lastMessage,
          };
        })
      );

      set({ chatList: newChatList, loading: false });
    } catch (error) {
      console.error('채팅 메시지 데이터를 가져오는 데 실패했습니다:', error);
      set({ error, loading: false });
    }
  },

  // 채팅방과 연결된 스터디 게시글 상태 업데이트
  fetchStudyPosts: async (chatList) => {
    const studyIds = chatList.map((chat) => chat.study).filter(Boolean);
    const uniqueStudyIds = [...new Set(studyIds)];

    const studyPromises = uniqueStudyIds.map((studyId) =>
      pb.collection('Study_Posts').getOne(studyId)
    );

    try {
      const studyData = await Promise.all(studyPromises);
      const studyMap = studyData.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {});

      set({ studyPosts: studyMap });
    } catch (error) {
      console.error('스터디 게시글 데이터 fetch 실패:', error);
    }
  },

  setToggleModal: () => {
    set((s) => ({ isOpenedModal: !s.isOpenedModal }));
  },
}));

export default useChatListStore;
