import { create } from 'zustand';
import pb from '@/api/pb';
import { getStorageData } from '@/utils';

const useCategoryStore = create((set) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    const user = getStorageData('authInfo')?.user;

    if (!user) {
      console.error('사용자 정보가 없습니다.');
      set({ categories: [], isLoading: false });
      return;
    }

    const categoryIdArray = user?.category || [];

    if (categoryIdArray.length === 0) {
      set({ categories: [], isLoading: false });
      return;
    }

    try {
      const categories = await Promise.all(
        categoryIdArray.map((id) => pb.collection('Categories').getOne(id))
      );
      set({ categories });
    } catch (error) {
      console.error('카테고리를 가져오는 중 에러 발생:', error);
      set({ error: '카테고리를 불러오는 데 실패했습니다.' });
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
