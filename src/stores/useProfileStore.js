import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  userList: [],
  user: {},
  job: null,
  license: null,
  nickname: null,

  fetchUserData: () => {
    const authUser = getStorageData('authInfo')?.user;
    pb.collection('users')
      .getOne(authUser.id)
      .then((user) => set({ user }));
  },

  setJob: (job) => {
    set({ job });
  },
  setLicense: (license) => {
    set({ license });
  },
  setNickname: (nickname) => {
    set({ nickname });
  },
}));

export default useProfileStore;
