import { Link } from 'react-router-dom';
import CategoryButton from '@/components/CategoryButton';

export default function SelectCategory() {
  return (
    <>
      <h1>카테고리 선택</h1>
      <Link to={'/signup'}>회원가입으로 이동</Link>
      <section className="flex justify-between flex-wrap m-3">
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
      </section>
    </>
  );
}
