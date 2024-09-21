import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryButton from '@/components/CategoryButton';
import CheckButton from '@/components/CheckButton';
import SearchBar from '@/components/SearchBar';
import LeftIcon from '@/components/LeftIcon';
import pb from '@/api/pb'; // PocketBase 설정 파일 불러오기

export default function SelectCategory() {
  // 선택된 카테고리 상태 관리
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 모든 카테고리 데이터 상태
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // 포켓베이스에서 카테고리 데이터를 가져오기
    const fetchCategories = async () => {
      const records = await pb.collection('Categories').getFullList(); // 'categories' 컬렉션의 전체 목록 가져오기
      console.log(records);
      setCategories(records); // 카테고리 상태 업데이트
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (id) => {
    // 이미 선택된 경우 제외, 아닌 경우 추가
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((catId) => catId !== id));
    } else {
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <div className="my-2 flex items-center px-2.5 py-1 gap-2">
        <LeftIcon />
        <SearchBar location="분야 (이름)로 검색" />
      </div>

      <section className="flex justify-between flex-wrap m-3">
        <p className="my-4 pointer-events-none">
          <CheckButton
            label={
              <>
                🚫 작심하루는{' '}
                <span className="text-negative">18세 이상의 성인</span>만 이용
                가능해요
              </>
            }
            bgColor="bg-[#F0FBFF]"
            border="border-none"
            font="text-sm"
            rounded="rounded-[10px]"
            height="h-[40px]"
          />
        </p>

        <div className="flex flex-wrap m-2 max-h-[388px] overflow-y-auto gap-2 no-scrollbar">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              smallText={category.category_type}
              largeText={category.category_name}
              isSelected={selectedCategories.includes(category.id)}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>

        <p className="my-4">
          <Link to={'/signup'}>
            <CheckButton
              label="이대로 저장할래요"
              textColor="text-white"
              bgColor="bg-primary"
              border="border-none"
              rounded="rounded-[8px]"
              onClick={() =>
                localStorage.setItem(
                  'selectedCategories',
                  JSON.stringify(selectedCategories)
                )
              }
            />
          </Link>
        </p>
      </section>
    </>
  );
}
