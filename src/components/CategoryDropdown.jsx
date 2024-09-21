import { useState, useEffect } from 'react';
import pb from '@/api/pb';
import { func } from 'prop-types';

CategoryDropdown.propTypes = {
  onSelect: func.isRequired,
};

function CategoryDropdown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState('카테고리를 선택해주세요');

  useEffect(() => {
    async function fetchCategories() {
      try {
        // 현재 로그인한 유저 정보 가져오는 것
        const user = pb.authStore.model;

        // 유저의 category 필드에서 카테고리 ID 배열 가져옴
        const categoryIds = user.category;

        if (categoryIds && categoryIds.length > 0) {
          const categoriesList = await Promise.all(
            categoryIds.map(async (categoryId) => {
              const category = await pb
                .collection('Categories')
                .getOne(categoryId);
              return category.category_name; // 카테고리의 이름들 반환
            })
          );

          // 가져온 카테고리 이름들 상태에 저장
          setCategories(categoriesList);
        }
      } catch (error) {
        console.error('카테고리 정보 로딩 중 오류가 발생했습니다:', error);
      }
    }

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    // 선택된 카테고리를 부모 컴포넌트로 전달
    onSelect(category);
  };

  return (
    <div className="relative w-full text-base">
      <button
        className="w-full px-3 py-4 bg-white border-b border-gray-300 text-left flex justify-between items-center text-base"
        onClick={toggleDropdown}
      >
        <span>{selectedCategory}</span>
        <svg className="w-4 h-4" aria-label="드롭다운 열기">
          <use href={'/stack.svg#down'} />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute cursor-pointer w-full shadow-md bg-white border-gray-300">
          {categories.map((category, index) => (
            <li
              key={index}
              className="px-4 py-2 border-b"
              onClick={() => selectCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
