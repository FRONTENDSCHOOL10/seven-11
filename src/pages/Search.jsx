import LeftIcon from '@/components/LeftIcon';
import SearchBar from '@/components/SearchBar';
import { Helmet } from 'react-helmet-async';

export default function Search() {
  return (
    <>
      <Helmet>
        <title>검색 페이지</title>
        <meta
          name="description"
          content="다양한 스터디 모집 글을 검색하고 참여하세요. 원하는 스터디를 쉽게 찾을 수 있습니다."
        />
      </Helmet>
      <h1>서치페이지</h1>
      <div className="flex items-center px-2.5 py-1 gap-4">
        <LeftIcon />
        <SearchBar location="근처에서 검색" />
      </div>
    </>
  );
}
