import CheckButton from '@/components/CheckButton';
import InputText from '@/components/InputText';
import InputTitle from '@/components/SubTitle';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <h1>로그인</h1>
      <Link to={'/home'}>홈페이지로 이동</Link>
      <InputTitle title="이메일" />
      <InputText placeholder="이메일을 작성해주세요" />
      <CheckButton label="중복확인" />
      <InputTitle title="비밀번호" />
      <InputText placeholder="비밀번호를 작성해주세요" />
      <InputText placeholder="비밀번호를 한번 더 작성해주세요" />
      <InputTitle title="닉네임" />
      <InputText placeholder="닉네임을 작성해주세요" />
      <CheckButton label="중복확인" />
      <InputTitle title="직업" />
      <InputText placeholder="직업을 입력해주세요" />
      <InputTitle title="성별" />
    </>
  );
}
