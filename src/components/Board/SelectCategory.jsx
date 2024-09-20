import useCategoryStore from '@/stores/useCategoryStore';
import clsx from 'clsx';
import { func } from 'prop-types';
import { memo, useEffect, useState } from 'react';

SelectCategory.propTypes = {
  onClick: func,
};

function SelectCategory({ onClick }) {
  const categories = useCategoryStore((s) => s.categories);
  const setCategories = useCategoryStore((s) => s.fetchCategories);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isHidden, setIsHidden] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };

  const listClass = clsx(isHidden ? 'hidden' : '');

  const handleSelect = (e) => {
    e.preventDefault();
    const selectedCategory = e.target.textContent;

    onClick?.(selectedCategory);
    setIsHidden(!isHidden);
    setCategory(selectedCategory);
  };

  const selectedCategoryName = category ? category : '카테고리를 선택해주세요.';

  return (
    <fieldset>
      <ul className="text-base">
        <button
          className="flex w-full justify-between items-center border-b px-3 py-4 border-gray-300"
          onClick={handleClick}
        >
          <span className="text-base">{selectedCategoryName}</span>
          <span className="">
            <svg className="w-4 h-4">
              <use href="/stack.svg#down" />
            </svg>
          </span>
        </button>
        {categories.map((category) => (
          <li
            key={category.id}
            className={`py-4 px-3 border-b border-gray-300 ${listClass}`}
            onClick={handleSelect}
          >
            <button className="w-full flex justify-start">
              {category.category_name}
            </button>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export default memo(SelectCategory);
