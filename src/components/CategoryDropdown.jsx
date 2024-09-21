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
        const user = pb.authStore.model;

        // 유저의 category 필드에서 카테고리 ID 배열 가져오기
        const categoryIds = user.category;

        if (categoryIds && categoryIds.length > 0) {
          const categoriesList = await Promise.all(
            categoryIds.map(async (categoryId) => {
              const category = await pb
                .collection('Categories')
                .getOne(categoryId);
              return { id: category.id, name: category.category_name }; // 카테고리 ID와 이름 반환
            })
          );

          // 카테고리 정보 저장
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
    setSelectedCategory(category.name); // 이름만 상태로 저장
    setIsOpen(false);
    onSelect(category.id); // 부모 컴포넌트에 ID만 전달
  };

  return (
    <div className="relative w-full text-base">
      <button
        className="w-full px-3 py-4 bg-white border-b border-gray-300 text-left flex justify-between items-center text-base"
        onClick={toggleDropdown}
      >
        <span>{selectedCategory}</span> {/* 카테고리 이름만 표시 */}
        <svg className="w-4 h-4" aria-label="드롭다운 열기">
          <use href={'/stack.svg#down'} />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute cursor-pointer w-full shadow-md bg-white border-gray-300">
          {categories.map((category) => (
            <li
              key={category.id}
              className="px-4 py-2 border-b hover:bg-gray-100"
              onClick={() => selectCategory(category)} // 카테고리 객체 전달
            >
              {category.name} {/* 카테고리 이름만 표시 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
