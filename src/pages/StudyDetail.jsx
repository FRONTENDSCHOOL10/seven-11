import { useEffect } from 'react';
import pb from '@/api/pb';
import TopNav from '@/components/TopNav';
import useUserStore from '../stores/useUserStore';
import { string } from 'prop-types';

StudyDetailPage.propTypes = {
  studyPostId: string.isRequired,
};

function StudyDetailPage({ studyPostId }) {
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
      <h1>스터디 상세 페이지</h1>
      <TopNav />
    </>
  );
}

export default StudyDetailPage;
