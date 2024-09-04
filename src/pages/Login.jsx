import CheckButton from '@/components/CheckButton';
import InputText from '@/components/InputText';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <h1>로그인</h1>
      <Link to={'/home'}>홈페이지로 이동</Link>
      <InputText placeholder="이메일을 작성해주세요" />
      <CheckButton label="중복확인" />
      <InputText placeholder="비밀번호를 작성해주세요" />
      <InputText placeholder="비밀번호를 한번 더 작성해주세요" />
      <CheckButton label="중복확인" />
      <InputText placeholder="직업을 입력해주세요" />
    </>
  );
}
