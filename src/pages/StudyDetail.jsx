import pb from '@/api/pb';
import { Badge } from '@/components';
import { ProfileCard } from '@/components/MyPage';
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
        const user = await pb.collection('users').authRefresh();
        const userId = user.id;
        setCurrentUserId(userId);

        const studyPostData = await pb
          .collection('Study_Posts')
          .getFirstListItem(`id="${studyPostId}"`, {
            expand: 'author',
          });

        const postAuthorId = studyPostData.expand.author.id;
        setPostAuthorId(postAuthorId);
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
      <ProfileCard />
    </>
  );
}

export default StudyDetailPage;
