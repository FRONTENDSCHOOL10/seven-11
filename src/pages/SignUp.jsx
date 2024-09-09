import { Link } from 'react-router-dom';
import CheckButton from '@/components/CheckButton';
import GenderRadio from '@/components/GenderRadio';
import InputText from '@/components/InputText';
import SubTitle from '@/components/SubTitle';
import NormalButton from '@/components/NormalButton';
import DateButton from '@/components/DateButton';
import SmallText from '@/components/SmallText';

export default function SignUp() {
  const handleSignUp = () => {};
  return (
    <>
      <h1>회원가입 페이지</h1>
      <Link to={'/check-email'}>이메일 체크 페이지로 이동</Link>
      <div className=" flex flex-col items-center justify-center">
        <section>
          <SubTitle title="안녕하세요!" />
          <SubTitle title="이메일로 회원가입해주세요." />
          <SmallText title="회원 정보는 안전하게 보관되며 서로에게 공개되지 않아요." />

          <div className="flex">
            <SmallText title="회원이 아니신가요?" color="text-gray-300" />
            <SmallText title="회원가입" href="/SignUp" color="text-primary" />
          </div>
        </section>

        <section>
          <SubTitle title="이메일" />
          <InputText placeholder="이메일을 작성해주세요" />
          <CheckButton label="중복확인" />
        </section>

        <section>
          <SubTitle title="비밀번호" />
          <InputText placeholder="비밀번호를 작성해주세요" />
          <InputText placeholder="비밀번호를 한번 더 작성해주세요" />
        </section>

        <section>
          <SubTitle title="닉네임" />
          <InputText placeholder="닉네임을 작성해주세요" />
          <CheckButton label="중복확인" />
        </section>

        <section>
          <SubTitle title="직업" />
          <InputText placeholder="직업을 입력해주세요" />
        </section>

        <section>
          <SubTitle title="성별" />
          <GenderRadio />
        </section>

        <section>
          <div className="mx-0.5">
            <SubTitle title="생년월일" />
          </div>

          <div className="flex">
            <DateButton label="년" />
            <DateButton label="월" />
            <DateButton label="일" />
          </div>
        </section>

        <section>
          <SubTitle title="주소" />
          <CheckButton label="주소 찾기" />
        </section>

        <NormalButton onClick={handleSignUp} label="가입하기" />
      </div>
    </>
  );
}
