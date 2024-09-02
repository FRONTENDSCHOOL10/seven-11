import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <h1>랜딩페이지</h1>
      <Link to={'/categories'}>카테고리 페이지로 이동</Link>
      <svg role="img" aria-label="현재 위치" className="svg-icon">
        <use href="/sprite.svg#location" />
      </svg>
    </>
  );
}
