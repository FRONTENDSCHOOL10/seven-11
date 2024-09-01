import { Link } from 'react-router-dom';

export default function CheckEmail() {
  return (
    <>
      <h1>이메일 확인하세요</h1>
      <Link to={'/login'}>로그인 페이지로 이동</Link>
    </>
  );
}
