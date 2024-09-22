import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudyForm from '@/components/StudyForm';
import pb from '@/api/pb';

export default function StudyEdit() {
  const { postId } = useParams(); // URL에서 postId 가져옴
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostData() {
      try {
        // API 호출을 통해 postId로 데이터 가져오기
        const studyPost = await pb.collection('Study_Posts').getOne(postId, {
          expand: 'user,category,chatroom',
        });
        setPost(studyPost); // 가져온 데이터를 상태에 저장
        setLoading(false); // 로딩 완료
      } catch (err) {
        console.error('스터디 정보를 불러오는데 실패했습니다:', err);
        setError('스터디 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false); // 로딩 상태 종료
      }
    }

    fetchPostData();
  }, [postId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <>{post && <StudyForm mode="edit" studyData={post} />}</>;
}
