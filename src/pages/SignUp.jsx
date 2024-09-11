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
        <section className="ml-3 my-2 text-left self-start">
          <SubTitle title="안녕하세요!" />
          <SubTitle title="이메일로 회원가입해주세요." />
          <div className="my-2">
            <SmallText title="회원 정보는 안전하게 보관되며 서로에게 공개되지 않아요." />
          </div>

          {/* <div className="flex">
            <SmallText title="회원이 아니신가요?" color="text-gray-300" />
            <SmallText title="회원가입" href="/SignUp" color="text-primary" />
          </div> */}
        </section>

        <section>
          <div className="mt-1.5">
            <SubTitle title="이메일 " />
          </div>
          <div className="my-3">
            <InputText placeholder="이메일을 작성해주세요" />
          </div>
          <div className="my-3">
            <CheckButton label="중복확인" />
          </div>
        </section>

        <section>
          <div className="mt-1.5">
            <SubTitle title="비밀번호" />
          </div>
          <div className="my-3">
            <InputText placeholder="비밀번호를 작성해주세요" />
          </div>
          <div className="my-3">
            <InputText placeholder="비밀번호를 한번 더 작성해주세요" />
          </div>
        </section>

        <section>
          <div className="mt-1.5">
            <SubTitle title="닉네임" />
          </div>
          <div className="my-3">
            <InputText placeholder="닉네임을 작성해주세요" />
          </div>
          <div className="my-3">
            <CheckButton label="중복확인" />
          </div>
        </section>

        <section>
          <div className="mt-1.5">
            <SubTitle title="직업" />
          </div>
          <div className="my-3">
            <InputText placeholder="직업을 입력해주세요" />
          </div>
        </section>

        <section>
          <div className="mt-1.5">
            <SubTitle title="성별" />
          </div>
          <div className="my-3">
            <GenderRadio />
          </div>
        </section>

        <section>
          <div className="my-2 mx-0.5">
            <SubTitle title="생년월일" />
          </div>

          <div className="flex">
            <div className="mx-1 my-1">
              <DateButton label="년" />
            </div>
            <div className="mx-1 my-1">
              <DateButton label="월" />
            </div>
            <div className="mx-1 my-1">
              <DateButton label="일" />
            </div>
          </div>
        </section>

        <section>
          <div className="mt-1.5">
            <SubTitle title="주소" />
          </div>
          <div className="my-3">
            <CheckButton label="주소 찾기" />
          </div>
        </section>

        <div className="mb-3">
          <NormalButton onClick={handleSignUp} label="가입하기" />
        </div>
      </div>
    </>
  );
}
