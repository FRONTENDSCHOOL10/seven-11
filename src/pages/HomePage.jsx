import SelectButton from '@/components/SelectButton';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex gap-3 flex-col">
      <h1>홈페이지</h1>
      <SelectButton
        options={[
          { value: 'anyone', label: '누구나' },
          { value: 'female', label: '여자만' },
          { value: 'male', label: '남자만' },
        ]}
      />
      <Link to={'qna-post'}>게시글 작성</Link>
      <Link to={'study-post'}>모집글 작성</Link>
    </div>
  );
}
