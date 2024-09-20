import { create } from 'zustand';

const usePostOptionsStore = create((set) => ({
  options: {
    people: '2',
    date: '',
    time: '',
    gender: '',
    location: '',
  },
  setOption: (optionType, value) =>
    set((state) => ({
      options: {
        ...state.options,
        [optionType]: value,
      },
    })),
}));

export default usePostOptionsStore;
