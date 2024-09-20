import pb from '@/api/pb';
import { BannerSwiper, SelectButton } from '@/components';
import { CategoryNav, StudyPostItem } from '@/components/Board';
import useCategoryStore from '@/stores/useCategoryStore';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FadeLoader } from 'react-spinners';

export default function HomePage() {
  const [studyList, setStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  // 카테고리 한 번만 가져오기
  const fetchCategoriesOnce = useCallback(async () => {
    if (categories.length === 0) {
      await fetchCategories();
    }
  }, [categories, fetchCategories]);

  // 스터디 리스트 가져오기
  const studyListFetch = useCallback(async () => {
    if (studyList.length === 0) {
      try {
        setIsLoading(true); // 로딩 시작
        const data = await pb.collection('Study_Posts').getFullList({
          sort: '-created',
        });
        setStudyList(data);
      } catch (error) {
        console.error(
          '스터디 게시글 리스트를 가져오는 데 실패했습니다.:',
          error
        );
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }
  }, [studyList]);

  useEffect(() => {
    fetchCategoriesOnce();
  }, [fetchCategoriesOnce]);

  useEffect(() => {
    studyListFetch();
  }, [studyListFetch]);

  // 선택된 카테고리로 게시글 필터링
  const filteredStudyList = selectedCategory
    ? studyList.filter((item) => item.category === selectedCategory)
    : studyList; // 선택된 카테고리가 없으면 전체 게시글 표시

  // 로딩 상태일 때 보여줄 화면
  if (isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
  }

  const options = [
    { value: '전체', label: '전체' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.category_name,
    })),
  ];

  return (
    <div className="w-full ">
      <Helmet>
        <title>작심하루 - 홈</title>
        <meta
          name="description"
          content="우리 동네 스터디 모집글을 확인하세요."
        />
      </Helmet>
      <div className="w-full flex flex-col">
        <BannerSwiper />
        <CategoryNav />
        <div className="border-b border-gray-300 pl-3 py-2">
          <SelectButton
            options={options}
            onSelect={(value) => setSelectedCategory(value)}
          />
        </div>
        <div className="pb-[60px] overflow-y-auto no-scrollbar">
          <div>
            {filteredStudyList.length === 0 ? (
              <div className="w-full h-[575px] flex items-center justify-center">
                스터디 게시글이 없습니다.
              </div>
            ) : (
              filteredStudyList.map((item) => (
                <StudyPostItem key={item.id} item={item} studyList={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
