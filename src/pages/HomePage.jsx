import pb from '@/api/pb';
import { BannerSwiper } from '@/components';
import { CategoryNav, StudyPostItem } from '@/components/Board';
import useCategoryStore from '@/stores/useCategoryStore';
import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const [studyList, setStudyList] = useState([]);
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory); // 선택된 카테고리 가져오기

  // 카테고리 한번만 가져오기
  const fetchCategoriesOnce = useCallback(async () => {
    if (categories.length === 0) {
      await fetchCategories();
    }
  }, [categories, fetchCategories]);

  // 스터디 리스트 가져오기
  const studyListFetch = useCallback(async () => {
    if (studyList.length === 0) {
      try {
        const data = await pb.collection('Study_Posts').getFullList();
        setStudyList(data);
      } catch (error) {
        console.error(
          '스터디 게시글 리스트를 가져오는 데 실패했습니다.:',
          error
        );
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

  if (!categories || categories.length === 0) {
    return <div>페이지 로딩중...</div>;
  }

  return (
    <div className="w-full">
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
        <div className="h-[60%] bottom-3 overflow-y-auto no-scrollbar">
          <div>
            {filteredStudyList.map((item) => (
              <StudyPostItem key={item.id} item={item} studyList={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
