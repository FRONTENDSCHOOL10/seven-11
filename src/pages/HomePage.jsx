import pb from '@/api/pb';
import { BannerSwiper } from '@/components';
import { CategoryNav, StudyPostItem } from '@/components/Board';
import useCategoryStore from '@/stores/useCategoryStore';
import { getStorageData } from '@/utils';
import extractCityDistrict from '@/utils/extractCityDistrict';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FadeLoader } from 'react-spinners';

export default function HomePage() {
  const [studyList, setStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  const user = getStorageData('authInfo').user;
  const userLocation = extractCityDistrict(user.address);

  const studyListFetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await pb.collection('Study_Posts').getFullList({
        sort: '-created',
      });

      // 유저 카테고리에 속한 스터디만 필터링
      const userCategories = categories.map((cat) => cat.id);
      const filteredData = data.filter((item) => {
        const postLocation = extractCityDistrict(item.location);
        return (
          postLocation === userLocation &&
          userCategories.includes(item.category)
        );
      });

      setStudyList(filteredData);
    } catch (error) {
      console.error('스터디 게시글 리스트를 가져오는 데 실패했습니다.:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userLocation, categories]);

  useEffect(() => {
    if (categories.length === 0) {
      setIsCategoryLoading(true);
      fetchCategories().finally(() => {
        setIsCategoryLoading(false);
      });
    } else {
      setIsCategoryLoading(false);
    }
  }, [fetchCategories, categories]);

  useEffect(() => {
    if (!isCategoryLoading) {
      studyListFetch();
    }
  }, [studyListFetch, isCategoryLoading]);

  const filteredStudyList = selectedCategory
    ? studyList.filter((item) => item.category === selectedCategory)
    : studyList;

  if (isLoading || isCategoryLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
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

        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="pb-[60px] overflow-y-auto no-scrollbar">
          <div>
            {filteredStudyList.length === 0 ? (
              <div className="w-full h-[575px] flex items-center justify-center">
                스터디 게시글이 없습니다.
              </div>
            ) : (
              filteredStudyList.map((item) => (
                <StudyPostItem
                  key={item.id}
                  item={item}
                  categories={categories}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
