import BannerSwiper from '@/components/BannerSwiper';
import CategoryNav from '@/components/Board/CategoryNav';
import CategoryDropdown from '@/components/CategoryDropdown';
import PostButton from '@/components/PostButton';
import PostOptionList from '@/components/PostOptionList';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex gap-3 flex-col">
      <BannerSwiper />
      <CategoryNav />
      <Link to={'board/post'}>게시글 작성</Link>
      <Link to={'study-post'}>모집글 작성</Link>
      <CategoryDropdown />
      <PostOptionList />
      <PostButton />
    </div>
  );
}
