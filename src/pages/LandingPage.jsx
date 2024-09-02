import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <h1>랜딩페이지</h1>

      {/* SVG 스프라이트 테스트 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>SVG 스프라이트 테스트 - right 아이콘</h2>
        <svg width="150" height="86">
          <use href="/icons/sprite.svg#right" />
        </svg>
        <p>right 아이콘이 제대로 보이면 SVG 스프라이트가 잘 적용된 것입니다.</p>
      </div>

      <Link to={'/categories'}>카테고리 페이지로 이동</Link>
    </>
  );
}
