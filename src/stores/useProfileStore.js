import pb from '@/api/pb';
import getAge from '@/utils/getAge';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  userList: [],
  loading: false,
  error: null,

  fetchUserList: async (id) => {
    set({ loading: true, error: null });
    try {
      const user = await pb.collection('users').getOne(id);
      const profileData = await pb
        .collection('User_Profile')
        .getFirstListItem(`user="${user.id}"`);

      const birth = user.birth_date;
      const age = getAge(birth);

      const list = [
        {
          title: '프로필 사진',
          img: `${pb.files.getUrl(user, user.avatar)}`,
        },
        {
          title: '닉네임',
          description: `${user.nickname}`,
        },
        {
          title: '성별',
          description: `${user.gender}`,
        },
        {
          title: '연령',
          description: `${age}`,
        },
        {
          title: '직업',
          description: `${profileData.job}`,
        },
        {
          title: '자격',
          description: `${profileData.license}`,
        },
      ];

      set({ userList: list, loading: false });
    } catch (error) {
      console.error('User Info Data Fetch 실패', error);
      set({ loading: false, error: 'Failed to fetch user data' });
    }
  },
}));

export default useProfileStore;
