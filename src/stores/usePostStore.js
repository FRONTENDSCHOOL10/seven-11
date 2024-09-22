import { create } from 'zustand';
import pb from '@/api/pb';

const usePostStore = create((set) => ({
  post: {},
  replies: [],
  setPost: async (id) => {
    const result = await pb
      .collection('Question_Posts')
      .getFirstListItem(`id="${id}"`);
    set({ post: result });
  },
  setReplies: async (id) => {
    const repliesData = await pb.collection('Question_Replies').getFullList({
      filter: `post="${id}"`,
      sort: '-created',
    });
    set({ replies: repliesData });
  },
  addReply: (newReply) =>
    set((state) => ({ replies: [newReply, ...state.replies] })),
  deleteReply: (replyId) =>
    set((state) => ({
      replies: state.replies.filter((reply) => reply.id !== replyId),
    })),
  updateReply: (replyId, newContent) =>
    set((state) => ({
      replies: state.replies.map((reply) =>
        reply.id === replyId ? { ...reply, reply: newContent } : reply
      ),
    })),
}));

export default usePostStore;
