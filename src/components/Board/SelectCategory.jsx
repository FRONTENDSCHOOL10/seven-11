import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import clsx from 'clsx';
import { func, object } from 'prop-types';
import { memo, useEffect, useState } from 'react';

SelectCategory.propTypes = {
  onClick: func,
  note: object,
};

function SelectCategory({ onClick, note }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  const user = getStorageData('authInfo').user;
  const categoryIdMap = user.category;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await Promise.all(
          categoryIdMap.map((id) => pb.collection('Categories').getOne(id))
        );
        setCategories(fetchedCategories);

        const noteCategoryId = note?.category;

        if (noteCategoryId) {
          const selectedCategory = fetchedCategories.find(
            (cat) => cat.id === noteCategoryId
          );

          if (selectedCategory) {
            setCategory(selectedCategory.category_name);
          }
        }
      } catch (error) {
        console.warn('카테고리 fetch 에러: ', error);
      }
    };

    if (categoryIdMap.length > 0) {
      fetchCategories();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setIsHidden(!isHidden);
  };

  const listClass = clsx(isHidden ? 'hidden' : '');

  const handleSelect = (e) => {
    e.preventDefault();

    const selectedCategoryId = e.currentTarget.dataset.categoryId;
    const selectedCategoryName = e.currentTarget.textContent;

    onClick?.(selectedCategoryId);
    setIsHidden(!isHidden);
    setCategory(selectedCategoryName); // 선택된 카테고리 이름 설정
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
            data-category-id={category.id}
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
