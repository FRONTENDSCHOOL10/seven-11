import { create } from 'zustand';
import pb from '../api/pb.js';

const useUserStore = create((set, get) => ({
  currentUserId: null,
  postAuthorId: null,
  setCurrentUserId: (id) => {
    console.log('currentUserId:', id);
    set({ currentUserId: id });
  },
  setPostAuthorId: (id) => {
    console.log('postAuthorId:', id);
    set({ postAuthorId: id });
  },

  fetchCurrentUserId: async () => {
    try {
      const user = await pb.authStore.model;
      set({ currentUserId: user?.id });
    } catch (error) {
      console.error('현재 사용자 ID를 가져오는 데 실패했습니다:', error);
    }
  },

  fetchPostAuthorId: async (collectionName, postId) => {
    try {
      const post = await pb.collection(collectionName).getOne(postId);
      set({ postAuthorId: post?.authorId });
    } catch (error) {
      console.error(
        `${collectionName} 에서 글쓴이 ID를 가져오는데 실패했습니다:`,
        error
      );
    }
  },

  isAuthor: () => {
    const { currentUserId, postAuthorId } = get();
    return currentUserId === postAuthorId;
  },
}));

export default useUserStore;
