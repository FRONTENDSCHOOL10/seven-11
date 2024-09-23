import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryButton from '@/components/CategoryButton';
import CheckButton from '@/components/CheckButton';
import SearchBar from '@/components/SearchBar';
import LeftIcon from '@/components/LeftIcon';
import pb from '@/api/pb'; // PocketBase 설정 파일 불러오기

export default function SelectCategory() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const records = await pb.collection('Categories').getFullList();
      setCategories(records);
    };
    fetchCategories();
  }, []);

  const handleCategorySelect = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((catId) => catId !== id));
    } else {
      setSelectedCategories((prev) => [...prev, id]);
    }
  };

  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  const handleSearch = (value) => {
    console.log(value);
  };
  return (
    <>
      <div className="my-2 flex items-center px-3 gap-1 py-1">
        <LeftIcon />
        {/* <SearchBar
          location="분야 (이름)로 검색"
          inputColor="bg-gray-100"
          onChange={handleSearch}
        /> */}
      </div>

      <section className="flex justify-center flex-wrap m-3">
        <p className="my-4 pointer-events-none w-full">
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

        <div className="grid grid-cols-2 gap-3 max-h-[480px] min-h-[320px] w-full overflow-y-auto no-scrollbar">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategoryButton
                key={category.id}
                smallText={category.category_type}
                largeText={category.category_name}
                isSelected={selectedCategories.includes(category.id)}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))
          ) : (
            <p className="text-gray-500">검색된 카테고리가 없습니다.</p>
          )}
        </div>

        <div className="my-4 w-full min-w-[320px] max-w-[430px] px-3 fixed bottom-0">
          <Link to={selectedCategories.length >= 3 ? '/signup' : '#'}>
            <CheckButton
              label="이대로 저장할래요"
              textColor="text-white"
              bgColor={
                selectedCategories.length >= 3 ? 'bg-primary' : 'bg-gray-300'
              }
              border="border-none"
              rounded="rounded-[8px]"
              onClick={() => {
                if (selectedCategories.length >= 3) {
                  localStorage.setItem(
                    'selectedCategories',
                    JSON.stringify(selectedCategories)
                  );
                }
              }}
              disabled={selectedCategories.length < 3}
            />
          </Link>
        </div>
      </section>
    </>
  );
}
