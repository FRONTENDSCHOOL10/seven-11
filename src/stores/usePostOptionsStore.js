import { create } from 'zustand';

const usePostOptionsStore = create((set) => {
  const now = new Date();

  const formatDate = now.toISOString().split('T')[0];

  const formatTime = now.toTimeString().split(':').slice(0, 2).join(':');

  return {
    options: {
      people: '2',
      date: formatDate,
      time: formatTime,
      gender: '누구나',
      location: '',
    },
    setOption: (optionType, value) =>
      set((state) => ({
        options: {
          ...state.options,
          [optionType]: value,
        },
      })),
  };
});

export default usePostOptionsStore;
