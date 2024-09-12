import pb from '@/api/pb';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  user: null,
  userList: [],
  loading: false,
  error: null,
  profile: {},

  fetchUserProfile: async (user) => {
    try {
      const record = await pb
        .collection('User_Profile')
        .getFirstListItem(`user.id="${user.id}"`);
      set({ profile: record });
    } catch (error) {
      console.error('User_Profile를 가져오는 데 실패했습니다.:', error);
    }
  },
}));

export default useProfileStore;
