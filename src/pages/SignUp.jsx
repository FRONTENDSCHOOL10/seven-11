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
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 여부
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 확인 여부
  const navigate = useNavigate(); // 리다이렉트 훅

  // 이메일 중복 확인 로직
  const handleCheckEmail = async () => {
    try {
      const result = await pb.collection('users').getList();
      const emailExists = result.items.some((item) => item.email === email);

      if (emailExists) {
        toast.error('이미 존재하는 이메일입니다.');
        setIsEmailChecked(false);
      } else {
        toast.success('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      toast.error('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 닉네임 중복 확인 로직
  const handleCheckNickname = async () => {
    try {
      const result = await pb.collection('users').getList();
      const nicknameExists = result.items.some(
        (item) => item.nickname === nickname
      );

      if (nicknameExists) {
        toast.error('이미 존재하는 닉네임입니다.');
        setIsNicknameChecked(false);
      } else {
        toast.success('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      toast.error('닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  };

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
    if (!isEmailChecked) {
      toast.error('이메일 중복 확인을 완료해주세요.');
      return;
    }

    if (!isNicknameChecked) {
      toast.error('닉네임 중복 확인을 완료해주세요.');
      return;
    }

    try {
      if (password !== passwordConfirm) {
        toast.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      const formattedMonth = month.padStart(2, '0'); // 월을 2자리로 맞춤
      const formattedDay = day.padStart(2, '0'); // 일을 2자리로 맞춤
      const birth_date = `${year}-${formattedMonth}-${formattedDay}`;

      const data = {
        email,
        password,
        passwordConfirm,
        nickname,
        birth_date,
        gender,
      };

      console.log('회원가입 데이터:', data); // 전송할 데이터 출력

      const record = await pb.collection('users').create(data);
      console.log('회원가입 성공:', record);
      toast.success('회원가입 성공!');
      navigate('/check-email');
    } catch (error) {
      console.error('회원가입 실패:', error);
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
              value={email}
              onChange={(value) => {
                setEmail(value);
                setIsEmailChecked(false);
              }}
              name="email"
            />
          </div>
          <div className="my-3">
            <CheckButton label="이메일 중복확인" onClick={handleCheckEmail} />
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
              onChange={(value) => setPassword(value)}
              name="password"
            />
          </div>
          <div className="my-3">
            <InputText
              inputType="password"
              placeholder="비밀번호를 한번 더 작성해주세요"
              value={passwordConfirm}
              onChange={(value) => setPasswordConfirm(value)}
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
              onChange={(value) => {
                setNickname(value);
                setIsNicknameChecked(false);
              }}
              name="nickname"
            />
          </div>
          <div className="my-3">
            <CheckButton
              label="닉네임 중복확인"
              onClick={handleCheckNickname}
            />
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

        {/* 성별, 생년월일 등 추가 입력 섹션 */}
        <section>
          <div className="mt-1.5">
            <SubTitle title="성별" />
          </div>
          <div className="my-3">
            <GenderRadio onChange={handleGenderChange} />
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

        <section>
          <div className="mt-1.5">
            <SubTitle title="주소" />
          </div>
          <div className="my-3">
            <CheckButton label="주소 찾기" />
          </div>
        </section>

        {/* 회원가입 버튼 */}
        <div className="mb-3">
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
