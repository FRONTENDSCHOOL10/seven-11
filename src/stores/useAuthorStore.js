import { create } from 'zustand';
import pb from '../api/pb.js';

const useAuthorStore = create((set, get) => ({
  postAuthorId: null,

  setPostAuthorId: (id) => {
    set({ postAuthorId: id });
  },

  fetchPostAuthorId: async (collectionName, postId) => {
    try {
      const post = await pb.collection(collectionName).getOne(postId);
      set({ postAuthorId: post?.authorId });
    } catch (error) {
      console.error(
        `${collectionName}에서 글쓴이 ID를 가져오는데 실패했습니다:`,
        error
      );
    }
  },

  isAuthor: (loggedInUserId) => {
    const { postAuthorId } = get();
    return loggedInUserId === postAuthorId;
  },
}));

export default useAuthorStore;
