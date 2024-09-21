import pb from '@/api/pb';
import { Badge } from '@/components';
import TopNav from '@/components/TopNav';
import { string } from 'prop-types';
import { useEffect, useState } from 'react';
import useUserStore from '../stores/useAuthorStore';

StudyDetailPage.propTypes = {
  studyPostId: string.isRequired,
};

function StudyDetailPage({ studyPostId }) {
  const [category, setCategory] = useState(null);
  const setCurrentUserId = useUserStore((state) => state.setCurrentUserId);
  const setPostAuthorId = useUserStore((state) => state.setPostAuthorId);

  useEffect(() => {
    async function fetchStudyPostData() {
      try {
        // 사용자 인증 정보 새로고침
        const user = await pb.collection('users').authRefresh();
        const userId = user.id;
        setCurrentUserId(userId);

        // 스터디 게시글 정보 가져오기, author와 category 정보를 확장해서 가져옴
        const studyPostData = await pb
          .collection('Study_Posts')
          .getFirstListItem(`id="${studyPostId}"`, {
            expand: 'author,category', // author와 category 필드 확장
          });

        const postAuthorId = studyPostData.expand.author.id;
        setPostAuthorId(postAuthorId);

        // 카테고리 정보 설정
        const categoryData = studyPostData.expand.category;
        if (categoryData) {
          setCategory(categoryData); // 카테고리 정보를 상태로 저장
        }
      } catch (error) {
        console.error('스터디 모집글 정보를 가져오는데 실패했습니다:', error);
      }
    }

    fetchStudyPostData();
  }, [studyPostId, setCurrentUserId, setPostAuthorId]);

  return (
    <>
      <TopNav />
      <Badge
        label={category ? category.category_name : '카테고리 없음'}
        isPrimary={false}
      />
    </>
  );
}

export default StudyDetailPage;
