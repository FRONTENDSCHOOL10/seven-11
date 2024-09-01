import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <>
      <h1>회원가입 페이지</h1>
      <Link to={'/check-email'}>이메일 체크 페이지로 이동</Link>
    </>
  );
}
