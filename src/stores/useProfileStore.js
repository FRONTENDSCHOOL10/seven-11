import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  userList: [],
  user: {},

  fetchUserData: () => {
    const authUser = getStorageData('authInfo')?.user;
    pb.collection('users')
      .getOne(authUser.id)
      .then((user) => set({ user }));
  },
}));

export default useProfileStore;
