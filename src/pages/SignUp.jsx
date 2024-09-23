import CheckButton from '@/components/CheckButton';
import GenderRadio from '@/components/GenderRadio';
import InputText from '@/components/InputText';
import SubTitle from '@/components/SubTitle';
import NormalButton from '@/components/NormalButton';
import DateButton from '@/components/DateButton';
import SmallText from '@/components/SmallText';
import pb from '@/api/pb'; // PocketBase 인스턴스 가져오기
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 리다이렉트를 위한 useNavigate 훅
import toast, { Toaster } from 'react-hot-toast';
import AddressSearch from '@/components/AddressSearch';
import getPbImageURL from '@/api/getPbImageURL';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [year, setYear] = useState(''); // 생년월일 상태 추가
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState([]); // 성별을 배열로 관리
  const [job, setJob] = useState(''); // 직업 상태 추가
  const [isEmailChecked, setIsEmailChecked] = useState(false); // 이메일 중복 확인 여부
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 확인 여부
  const [address, setAddress] = useState(''); // 주소 상태 추가
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리 상태 관리

  const navigate = useNavigate(); // 리다이렉트 훅

  // 컴포넌트 마운트 시 선택된 카테고리 로드
  useEffect(() => {
    const categories =
      JSON.parse(localStorage.getItem('selectedCategories')) || [];
    setSelectedCategories(categories);
  }, []);

  // 이메일 형식을 확인하기 위한 정규 표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 중복 확인 로직
  const handleCheckEmail = async () => {
    if (!email.trim()) {
      toast.error('이메일을 입력해 주세요.');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('올바른 이메일을 작성해 주세요.');
      return;
    }

    try {
      const result = await pb.collection('users').getList();
      const emailExists = result.items.some((item) => item.email === email);

      if (emailExists) {
        toast.error('이미 존재하는 이메일 입니다.');
        setIsEmailChecked(false);
      } else {
        toast.success('사용 가능한 이메일 입니다.');
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      toast.error('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 닉네임 중복 확인 로직
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      toast.error('닉네임을 입력해 주세요.');
      return;
    }

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

  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress); // 선택된 주소를 저장
  };

  // 회원가입 처리 로직
  const handleSignUp = async () => {
    if (!isEmailChecked) {
      toast.error('이메일 중복 확인을 완료해 주세요.');
      return;
    }

    if (!isNicknameChecked) {
      toast.error('닉네임 중복 확인을 완료해 주세요.');
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
        passwordConfirm: password,
        nickname,
        birth_date,
        gender,
        job,
        address,
        category: selectedCategories, // 선택된 카테고리 추가
        level: '뉴비',
        userTemp: 36.5,
        emailVisibility: true,
      };

      const record = await pb.collection('users').create(data);

      await pb.collection('users').requestVerification(record.email);
      toast.success('회원가입 성공!');
      navigate('/check-email');
    } catch (error) {
      console.error('회원가입 실패:', error);
      toast.error(`회원가입에 실패했습니다`);
    }
  };

  return (
    <>
      <Toaster /> {/* 알림 표시 */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* 회원가입 제목 섹션 */}
        <section className="ml-3 my-2 text-left self-start">
          <SubTitle title="안녕하세요." />
          <SubTitle title="이메일로 회원가입 해주세요." />
          <div className="my-2">
            <SmallText title="회원 정보는 안전하게 보관되며 서로에게 공개되지 않아요." />
          </div>
        </section>

        {/* 이메일 입력 섹션 */}
        <section className="w-full px-3">
          <div className="mt-1.5 ">
            <SubTitle title="이메일" />
          </div>
          <div className="my-3">
            <InputText
              inputType="email"
              placeholder="이메일을 작성해 주세요."
              value={email}
              onChange={(value) => {
                setEmail(value);
                setIsEmailChecked(false);
              }}
              name="email"
            />
          </div>
          <div className="my-3">
            <CheckButton label="중복확인" onClick={handleCheckEmail} />
          </div>
        </section>

        {/* 비밀번호 입력 섹션 */}
        <section className="w-full px-3">
          <div className="mt-1.5">
            <SubTitle title="비밀번호" />
          </div>
          <div className="my-3">
            <InputText
              inputType="password"
              placeholder="비밀번호를 작성해 주세요."
              value={password}
              onChange={(value) => setPassword(value)}
              name="password"
            />
          </div>
          <div className="my-3">
            <InputText
              inputType="password"
              placeholder="비밀번호를 한번 더 작성해 주세요."
              value={passwordConfirm}
              onChange={(value) => setPasswordConfirm(value)}
              name="passwordConfirm"
            />
          </div>
        </section>

        {/* 닉네임 입력 섹션 */}
        <section className="w-full px-3">
          <div className="mt-1.5">
            <SubTitle title="닉네임" />
          </div>
          <div className="my-3">
            <InputText
              inputType="text"
              placeholder="닉네임을 작성해 주세요."
              value={nickname}
              onChange={(value) => {
                setNickname(value);
                setIsNicknameChecked(false);
              }}
              name="nickname"
            />
          </div>
          <div className="my-3">
            <CheckButton label="중복확인" onClick={handleCheckNickname} />
          </div>
        </section>

        {/* 직업 입력 섹션 */}
        <section className="w-full px-3">
          <div className="mt-1.5">
            <SubTitle title="직업" />
          </div>
          <div className="my-3">
            <InputText
              inputType="text"
              placeholder="직업을 입력해 주세요."
              value={job}
              onChange={(value) => setJob(value)} // 직업 입력 상태 변경
              name="job"
            />
          </div>
        </section>

        {/* 성별, 생년월일 등 추가 입력 섹션 */}
        <section className="w-full px-3">
          <div className="mt-1.5">
            <SubTitle title="성별" />
          </div>
          <div className="my-3">
            <GenderRadio onChange={handleGenderChange} />
          </div>
        </section>

        {/* 생년월일 선택 섹션 */}
        <section className="w-full px-3">
          <div className="my-2 mx-0.5">
            <SubTitle title="생년월일" />
          </div>
          <div className="flex justify-start gap-3">
            <div className="my-1">
              <DateButton label="년" onChange={handleYearChange} />
            </div>
            <div className="my-1">
              <DateButton label="월" onChange={handleMonthChange} />
            </div>
            <div className="my-1">
              <DateButton label="일" onChange={handleDayChange} />
            </div>
          </div>
        </section>

        <section className="w-full px-3">
          <div className="mt-1.5">
            <SubTitle title="주소" />
          </div>
          <AddressSearch onAddressSelect={handleAddressSelect} />
        </section>

        {/* 회원가입 버튼 */}
        <div className="mb-3 w-full px-3">
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
