import { Link } from 'react-router-dom';
import CategoryButton from '@/components/CategoryButton';
import CheckButton from '@/components/CheckButton';
import SearchBar from '@/components/SearchBar';
import LeftIcon from '@/components/LeftIcon';

export default function SelectCategory() {
  return (
    <>
      <div className="my-2 flex items-center px-2.5 py-1 gap-2 ">
        <LeftIcon />
        <SearchBar location="분야 (이름)로 검색" />
      </div>

      <section className="flex justify-between flex-wrap m-3">
        <p className="my-4 pointer-events-none ">
          <CheckButton
            label={
              <>
                🚫 작심하루는{' '}
                <span className="text-negative">18세 이상의 성인</span>만 이용
                가능해요
              </>
            }
            bgColor="bg-[#F0FBFF]"
            border="border-none"
            font="text-[13px]"
            rounded="rounded-[10px]"
            height="h-[40px]"
          />
        </p>

        <CategoryButton smallText="언어" largeText="영어" />
        <CategoryButton smallText="언어" largeText="중국어" />
        <CategoryButton smallText="언어" largeText="일본어" />
        <CategoryButton smallText="입시" largeText="N수" />
        <CategoryButton smallText="프로그래밍" largeText="프론트엔드" />
        <CategoryButton smallText="프로그래밍" largeText="백엔드" />
        <CategoryButton smallText="디자인" largeText="UI • UX" />
        <CategoryButton smallText="자격증" largeText="한국사" />
        <CategoryButton smallText="디자인" largeText="포토샵" />
        <CategoryButton smallText="기타" largeText="기타" />

        <p className="my-4">
          <Link to={'/signup'}>
            <CheckButton
              label="이대로 저장할래요"
              textColor="text-white"
              bgColor="bg-primary"
              border="border-none"
              rounded="rounded-[8px]"
            />
          </Link>
        </p>
      </section>
    </>
  );
}
