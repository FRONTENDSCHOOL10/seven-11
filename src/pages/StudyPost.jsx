import NormalButton from '@/components/NormalButton';
import { useNavigate } from 'react-router-dom';

export default function StudyPost() {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate('/next-page');
  };

  return (
    <>
      <h1>스터디 모집글 작성 페이지</h1>
      <NormalButton onClick={handleNextPage} label="다음" />
    </>
  );
}
