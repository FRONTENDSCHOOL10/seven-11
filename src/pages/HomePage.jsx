import CategoryNav from '@/components/Board/CategoryNav';
import CategoryDropdown from '@/components/CategoryDropdown';
import PostButton from '@/components/PostButton';
import TopNav from '@/components/TopNav';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex gap-3 flex-col">
      <h1>홈페이지</h1>
      <TopNav />
      <CategoryNav />
      <Link to={'board/post'}>게시글 작성</Link>
      <Link to={'study-post'}>모집글 작성</Link>
      <CategoryDropdown />
      <PostButton />
    </div>
  );
}
