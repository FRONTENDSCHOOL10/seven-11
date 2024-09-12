import pb from '@/api/pb';
import { BannerSwiper } from '@/components';
import { CategoryNav, StudyPostItem } from '@/components/Board';
import useCategoryStore from '@/stores/useCategoryStore';
import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const [studyList, setStudyList] = useState([]);
  const { categories, fetchCategories } = useCategoryStore();

  const fetchCategoriesOnce = useCallback(async () => {
    if (categories.length === 0) {
      await fetchCategories();
    }
  }, [categories, fetchCategories]);

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

  if (!categories || categories.length === 0) {
    return <div>페이지 로딩중...</div>;
  }

  return (
    <>
      <Helmet>
        <title>작심하루 - 홈</title>
        <meta
          name="description"
          content="우리 동네 스터디 모집글을 확인하세요."
        />
      </Helmet>
      <div className=" flex flex-col">
        <BannerSwiper />
        <CategoryNav />
        {studyList.map((item) => (
          <StudyPostItem key={item.id} item={item} studyList={item} />
        ))}
      </div>
    </>
  );
}
