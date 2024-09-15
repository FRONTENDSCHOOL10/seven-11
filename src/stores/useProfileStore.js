import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  userList: [],
  loading: false,
  error: null,
  profile: {},

  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    const user = getStorageData('authInfo')?.user;

    if (!user) {
      console.error('사용자 정보가 없습니다.');
      set({ profile: {}, isLoading: false });
      return;
    }
    try {
      const record = await pb
        .collection('User_Profile')
        .getFirstListItem(`user.id="${user.id}"`);
      set({ profile: record, isLoading: false });
    } catch (error) {
      set({
        profile: {},
        isLoading: false,
        error: 'User_Profile를 불러오는 데 실패했습니다.',
      });
      console.error('User_Profile를 가져오는 데 실패했습니다.:', error);
    }
  },
}));

export default useProfileStore;
