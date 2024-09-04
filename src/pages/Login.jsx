import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <h1>로그인</h1>
      <Link to={'/home'}>홈페이지로 이동</Link>
    </>
  );
}
