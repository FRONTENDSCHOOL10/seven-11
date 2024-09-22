import { create } from 'zustand';
import pb from '../api/pb.js';

const useAuthorStore = create((set, get) => ({
  postAuthorId: null,
  currentUserId: null,

  setPostAuthorId: (id) => {
    set({ postAuthorId: id });
  },

  setCurrentUserId: (id) => {
    set({ currentUserId: id });
  },

  fetchPostAuthorId: async (collectionName, postId) => {
    try {
      const post = await pb.collection(collectionName).getOne(postId);
      const authorId = post?.authorId || null;

      if (authorId) {
        set({ postAuthorId: authorId });
      } else {
        console.error('Author ID not found in post:', post);
        set({ postAuthorId: null });
      }
    } catch (error) {
      console.error(
        `${collectionName}에서 글쓴이 ID를 가져오는데 실패했습니다:`,
        error
      );
      set({ postAuthorId: null });
    }
  },

  isAuthor: (loggedInUserId) => {
    const { postAuthorId } = get();
    return loggedInUserId === postAuthorId;
  },
}));

export default useAuthorStore;
