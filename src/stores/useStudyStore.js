import { create } from 'zustand';

const useStudyStore = create((set) => ({
  category: null,
  chatroom: null,

  setCategory: (fetchDataCategory) => set({ category: fetchDataCategory }),
  setChatroom: (fetchDataChatroom) => set({ chatroom: fetchDataChatroom }),
}));

export default useStudyStore;
