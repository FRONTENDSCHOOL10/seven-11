import { memo, useEffect } from 'react';
import useCategoryStore from '@/stores/useCategoryStore';

function CategoryNav() {
  const { categories, selectedCategory, fetchCategories, setSelectedCategory } =
    useCategoryStore();

  useEffect(() => {
    fetchCategories('i0cg783rtm915js');
  }, [fetchCategories]);

  console.log(categories);
  return (
    <ul className="w-full h-[37px] bg-primary flex flex-row gap-2 justify-center items-center font-semibold text-base">
      <li>
        <a
          className={selectedCategory === null ? 'text-white' : 'text-gray-400'}
          onClick={() => setSelectedCategory(null)}
        >
          전체
        </a>
      </li>

      {categories.map((item) => (
        <li key={item.id}>
          <a
            className={
              selectedCategory?.id === item.id ? 'text-white' : 'text-gray-400'
            }
            onClick={() => setSelectedCategory(item)}
          >
            {item.category_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default memo(CategoryNav);
