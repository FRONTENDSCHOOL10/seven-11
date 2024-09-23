import pb from '@/api/pb';
import { BannerSwiper } from '@/components';
import { CategoryNav, StudyPostItem } from '@/components/Board';
import { getStorageData } from '@/utils';
import extractCityDistrict from '@/utils/extractCityDistrict';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FadeLoader } from 'react-spinners';

export default function HomePage() {
  const [studyList, setStudyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]); // 카테고리 데이터 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태 추가

  const user = getStorageData('authInfo').user;
  const userLocation = extractCityDistrict(user.address);

  // 사용자 카테고리와 스터디 리스트 가져오기
  const fetchUserCategoriesAndStudyList = useCallback(async () => {
    try {
      setIsLoading(true);


      const userData = await pb.collection('Users').getOne(user.id, {
        expand: 'category', 
      });

      if (userData.expand?.category) {
        setCategories(userData.expand.category); 
      }

      // 스터디 리스트 가져오기
      const data = await pb.collection('Study_Posts').getFullList({
        sort: '-created',
      });

      // 구가 일치하는 데이터만 필터링
      const filteredData = data.filter((item) => {
        const postLocation = extractCityDistrict(item.location);
        if (postLocation) {
          return postLocation === userLocation;
        }
        return false;
      });

      setStudyList(filteredData);
    } catch (error) {
      console.error('스터디 게시글 리스트를 가져오는 데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user.id, userLocation]);

  useEffect(() => {
    fetchUserCategoriesAndStudyList();
  }, [fetchUserCategoriesAndStudyList]);

  // 선택된 카테고리로 게시글 필터링
  const filteredStudyList = selectedCategory
    ? studyList.filter((item) => item.category === selectedCategory)
    : studyList;

  if (isLoading) {
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
        {/* 사용자 카테고리와 상태 업데이트 함수 전달 */}
        <CategoryNav
          categories={categories} // 로그인된 사용자의 카테고리만 전달
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
                  categories={categories} // 카테고리 전달
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
