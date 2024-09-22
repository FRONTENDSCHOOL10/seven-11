import pb from '@/api/pb';
import { AuthorProfile, Badge, IconTextSmall } from '@/components';
import TopNav from '@/components/TopNav';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../stores/useAuthorStore';

function StudyDetailPage() {
  const { studyPostId } = useParams();
  const navigate = useNavigate();

  const [studyPostData, setStudyPostData] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const setCurrentUserId = useUserStore((state) => state.setCurrentUserId);
  const setPostAuthorId = useUserStore((state) => state.setPostAuthorId);

  useEffect(() => {
    async function fetchStudyPostData() {
      try {
        const user = pb.authStore.model;
        if (!user) {
          console.error('사용자가 로그인되지 않았습니다.');
          alert('로그인이 필요합니다.');
          navigate('/login'); // 로그인 페이지로 리디렉션
          return;
        }

        // 로그인된 사용자 정보 설정
        const userId = user.id;
        setCurrentUserId(userId);

        // 스터디 글 정보 가져오기
        const studyPost = await pb
          .collection('Study_Posts')
          .getFirstListItem(`id="${studyPostId}"`, {
            expand: 'author,category',
          });

        console.log('studyPostData:', studyPost);

        setStudyPostData(studyPost);

        const postAuthorId = studyPost.user || '작성자 없음';
        setPostAuthorId(postAuthorId);

        setCategory(
          studyPost.expand?.category || { category_name: '카테고리 없음' }
        );

        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('스터디 모집글 정보를 가져오는데 실패했습니다:', error);
        setError('스터디 정보를 가져오는데 문제가 발생했습니다.');
        setLoading(false);
      }
    }

    fetchStudyPostData();
  }, [studyPostId, setCurrentUserId, setPostAuthorId, navigate]);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // 날짜만 표시 (지역 포맷에 맞춰서)
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <TopNav />
      <div className="px-3">
        <Badge
          label={category ? category.category_name : '카테고리 없음'}
          isPrimary={false}
        />
        <div>
          <IconTextSmall
            icon="people"
            text={`${studyPostData.gender || 'N/A'} 참여 가능`}
          />
          <IconTextSmall
            icon="date"
            text={formatDate(studyPostData.date) || 'N/A'}
          />
          <IconTextSmall
            icon="fullMap"
            text={` ${studyPostData.location || 'N/A'}`}
          />
          
        </div>
        <span className="font-semibold">참여중인 이웃 </span>
        <AuthorProfile />
      </div>
    </>
  );
}

export default StudyDetailPage;
