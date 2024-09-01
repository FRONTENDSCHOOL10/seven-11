import { Link } from 'react-router-dom';

export default function SelectCategory() {
  return (
    <>
      <h1>카테고리 선택</h1>
      <Link to={'/signup'}>회원가입으로 이동</Link>
    </>
  );
}
