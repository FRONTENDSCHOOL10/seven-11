import CheckButton from '@/components/CheckButton';
import GenderRadio from '@/components/GenderRadio';
import InputText from '@/components/InputText';
import SubTitle from '@/components/SubTitle';
import NormalButton from '@/components/NormalButton';
import DateButton from '@/components/DateButton';
import SmallText from '@/components/SmallText';
import pb from '@/api/pb'; // PocketBase 인스턴스 가져오기
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트를 위한 useNavigate 훅
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [year, setYear] = useState(''); // 생년월일 상태 추가
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState([]); // 성별을 배열로 관리
  const navigate = useNavigate(); // 리다이렉트 훅

  const handleGenderChange = (selectedGenders) => {
    setGender(selectedGenders);
    console.log('선택된 성별:', selectedGenders); // 콘솔에 선택된 성별 출력
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear); // 선택된 년도 업데이트
  };

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth); // 선택된 월 업데이트
  };

  const handleDayChange = (selectedDay) => {
    setDay(selectedDay); // 선택된 일 업데이트
  };

  const handleSignUp = async () => {
    try {
      if (password !== passwordConfirm) {
        toast.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      // 생년월일 조합 (날짜 형식 확인)
      const formattedMonth = month.padStart(2, '0'); // 월을 2자리로 맞춤
      const formattedDay = day.padStart(2, '0'); // 일을 2자리로 맞춤
      const birth_date = `${year}-${formattedMonth}-${formattedDay}`;

      // PocketBase에 새로운 사용자 등록
      const data = {
        email,
        password,
        passwordConfirm, // 비밀번호 확인 필드
        nickname, // 닉네임 필드
        birth_date, // 생년월일 필드 추가 (YYYY-MM-DD 형식)
        gender, // 배열로 성별 필드 추가
      };

      console.log('회원가입 데이터:', data); // 전송할 데이터 출력

      // PocketBase에 회원가입 요청 보내기
      const record = await pb.collection('users').create(data);
      console.log('회원가입 성공:', record);
      toast.success('회원가입 성공!');
      navigate('/check-email');
    } catch (error) {
      console.error('회원가입 실패:', error); // 에러를 콘솔에 출력
      toast.error(`회원가입에 실패했습니다: ${error.message}`);
    }
  };

  return (
    <>
      <Toaster /> {/* 알림 표시 */}
      <div className="flex flex-col items-center justify-center">
        {/* 회원가입 제목 섹션 */}
        <section className="ml-3 my-2 text-left self-start">
          <SubTitle title="안녕하세요!" />
          <SubTitle title="이메일로 회원가입해주세요." />
          <div className="my-2">
            <SmallText title="회원 정보는 안전하게 보관되며 서로에게 공개되지 않아요." />
          </div>
        </section>

        {/* 이메일 입력 섹션 */}
        <section>
          <div className="mt-1.5">
            <SubTitle title="이메일" />
          </div>
          <div className="my-3">
            <InputText
              inputType="email"
              placeholder="이메일을 작성해주세요"
              value={email} // 상태값을 value로 전달
              onChange={(value) => setEmail(value)} // 입력값이 변경될 때 상태 업데이트
              name="email"
            />
          </div>
          <div className="my-3">
            <CheckButton label="중복확인" />
          </div>
        </section>

        {/* 비밀번호 입력 섹션 */}
        <section>
          <div className="mt-1.5">
            <SubTitle title="비밀번호" />
          </div>
          <div className="my-3">
            <InputText
              inputType="password"
              placeholder="비밀번호를 작성해주세요"
              value={password}
              onChange={(value) => setPassword(value)} // 비밀번호 상태 업데이트
              name="password"
            />
          </div>
          <div className="my-3">
            <InputText
              inputType="password"
              placeholder="비밀번호를 한번 더 작성해주세요"
              value={passwordConfirm}
              onChange={(value) => setPasswordConfirm(value)} // 비밀번호 확인 상태 업데이트
              name="passwordConfirm"
            />
          </div>
        </section>

        {/* 닉네임 입력 섹션 */}
        <section>
          <div className="mt-1.5">
            <SubTitle title="닉네임" />
          </div>
          <div className="my-3">
            <InputText
              inputType="text"
              placeholder="닉네임을 작성해주세요"
              value={nickname}
              onChange={(value) => setNickname(value)} // 닉네임 상태 업데이트
              name="nickname"
            />
          </div>
          <div className="my-3">
            <CheckButton label="중복확인" />
          </div>
        </section>

        {/* 성별, 생년월일 등 추가 입력 섹션 */}
        <section>
          <div className="mt-1.5">
            <SubTitle title="성별" />
          </div>
          <div className="my-3">
            <GenderRadio onChange={handleGenderChange} /> {/* 성별 선택 */}
          </div>
        </section>

        {/* 생년월일 선택 섹션 */}
        <section>
          <div className="my-2 mx-0.5">
            <SubTitle title="생년월일" />
          </div>
          <div className="flex">
            <div className="mx-1 my-1">
              <DateButton label="년" onChange={handleYearChange} />
            </div>
            <div className="mx-1 my-1">
              <DateButton label="월" onChange={handleMonthChange} />
            </div>
            <div className="mx-1 my-1">
              <DateButton label="일" onChange={handleDayChange} />
            </div>
          </div>
        </section>

        {/* 주소 찾기 버튼 */}
        <section>
          <div className="mt-1.5">
            <SubTitle title="주소" />
          </div>
          <div className="my-3">
            <CheckButton label="주소 찾기" />
          </div>
        </section>

        {/* 회원가입 버튼 */}
        <div className=" mb-3">
          <NormalButton
            btnType="submit"
            label="회원가입"
            onClick={handleSignUp}
          />
        </div>
      </div>
    </>
  );
}
