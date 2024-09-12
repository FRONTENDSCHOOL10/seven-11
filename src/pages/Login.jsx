import { userSignIn } from '@/api/user';
import InputText from '@/components/InputText';
import NormalButton from '@/components/NormalButton';
import { setStorageData } from '@/utils/storageData';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const AUTH_KEY = 'authInfo';
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formState;

      const authData = await userSignIn(email, password);

      const { record: user, token } = authData;
      const authInfo = { user, token };
      setStorageData(AUTH_KEY, authInfo);

      navigate('/home');
    } catch (error) {
      console.log('auth 에러:', error);
      alert('로그인 정보가 일치하지 않습니다.');
    }
  };

  const handleEmailInput = (value) => {
    setFormState((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handlePasswordInput = (value) => {
    setFormState((prev) => ({
      ...prev,
      password: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>작심하루 - 로그인</title>
        <meta
          name="description"
          content="로그인을 하고 작심하루의 다양한 서비스를 이용해보세요."
        />
      </Helmet>
      <div className="p-3">
        <div className="h-[180px] flex flex-col justify-end text-lg font-semibold mb-[47px]">
          <h1>환영합니다!</h1>
          <h1>가입된 이메일로 로그인 해주세요!</h1>
        </div>

        <form className="flex flex-col gap-[17px]" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-[17px]">
            <label className="text-lg font-semibold">이메일</label>
            <InputText
              name="email"
              inputType={'email'}
              onChange={handleEmailInput}
              placeholder="이메일을 작성해주세요"
            />
          </div>
          <div className="flex flex-col gap-[17px]">
            <label className="text-lg font-semibold">비밀번호</label>
            <InputText
              name="password"
              inputType={'password'}
              onChange={handlePasswordInput}
              placeholder="비밀번호를 작성해주세요"
            />
          </div>
          <NormalButton btnType="submit" label="로그인" />
          <div className="text-sm flex justify-center h-[45px] items-center gap-3">
            <span className="text-gray-300">회원이 아니신가요?</span>
            <Link className="text-primary" to={'/signup'}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
