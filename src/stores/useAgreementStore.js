import { create } from 'zustand';

const useAgreementStore = create((set) => ({
  checkedItems: {
    item1: false,
    item2: false,
    item3: false,
  },
  allChecked: false,

  setAllChecked: (isChecked) =>
    set(() => ({
      checkedItems: {
        item1: isChecked,
        item2: isChecked,
        item3: isChecked,
      },
      allChecked: isChecked,
    })),

  setItemChecked: (item, isChecked) =>
    set((state) => {
      const updatedCheckedItems = {
        ...state.checkedItems,
        [item]: isChecked,
      };
      const allChecked = Object.values(updatedCheckedItems).every(
        (checked) => checked
      );
      return {
        checkedItems: updatedCheckedItems,
        allChecked,
      };
    }),
}));

export default useAgreementStore;
