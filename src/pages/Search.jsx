import LeftIcon from '@/components/LeftIcon';
import SearchBar from '@/components/SearchBar';

export default function Search() {
  return (
    <>
      <h1>서치페이지</h1>
      <div className="flex items-center px-2.5 py-1 gap-4">
        <LeftIcon />
        <SearchBar location="근처에서 검색" />
      </div>
    </>
  );
}
