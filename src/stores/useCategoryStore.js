import { create } from 'zustand';
import pb from '@/api/pb';
import { getStorageData } from '@/utils';

const useCategoryStore = create((set) => ({
  categories: [], // 유저가 선택한 카테고리 list
  selectedCategory: null, // nav에서 선택한 카테고리

  // 카테고리 목록을 가져오는 함수
  fetchCategories: async () => {
    const user = getStorageData('authInfo').user;
    const categoryIdArray = user.category;
    const categories = await Promise.all(
      categoryIdArray.map((id) => pb.collection('Categories').getOne(id))
    );
    set({ categories });
  },

  // 카테고리 선택시 업데이트하는 함수
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
