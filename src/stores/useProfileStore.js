import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  user: getStorageData('authInfo').user,
  userList: [],
  loading: false,
  error: null,
  profile: {},

  fetchUserProfile: async () => {
    const user = getStorageData('authInfo').user;
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
