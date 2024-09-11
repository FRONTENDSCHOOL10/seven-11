import { useState, useEffect } from 'react';
import pb from '@/api/pb';
import StudyPostItem from '@/components/Board/StudyPostItem';
import BannerSwiper from '@/components/BannerSwiper';
import CategoryNav from '@/components/Board/CategoryNav';
import CategoryDropdown from '@/components/CategoryDropdown';
import PostButton from '@/components/PostButton';
import PostOptionList from '@/components/PostOptionList';
import { Link } from 'react-router-dom';
import useCategoryStore from '@/stores/useCategoryStore';
import { getStorageData } from '@/utils';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  const [studyList, setStudyList] = useState([]);
  const user = getStorageData('authInfo').user;
  const { categories, selectedCategory, fetchCategories, setSelectedCategory } =
    useCategoryStore();

  useEffect(() => {
    const fetch = async () => {
      await fetchCategories(user.id);
    };
    fetch();
  }, []);

  const studyListFetch = async () => {
    try {
      const data = await pb.collection('Study_Posts').getFullList();
      setStudyList(data);
    } catch (error) {
      console.error('스터디 게시글 리스트를 가져오는 데 실패했습니다.:', error);
    }
  };

  useEffect(() => {
    studyListFetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>작심하루 - 홈</title>
        <meta
          name="description"
          content="우리 동네 스터디 모집글을 확인하세요."
        />
      </Helmet>
      <div className="flex gap-3 flex-col">
        <BannerSwiper />
        <CategoryNav />
        <Link to={'board/post'}>게시글 작성</Link>
        <Link to={'study-post'}>모집글 작성</Link>
        <CategoryDropdown />
        {studyList.map((item) => (
          <StudyPostItem key={item.id} item={item} studyList={item} />
        ))}
        <PostOptionList />
        <PostButton />
      </div>
    </>
  );
}
