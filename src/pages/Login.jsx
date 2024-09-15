import { userSignIn } from '@/api/user';
import { InputText, NormalButton } from '@/components';
import { setStorageData } from '@/utils/';
import { isValidEmail, isValidLoginPwd } from '@/utils/validation';
import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const AUTH_KEY = 'authInfo';
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const { email, password } = formState;
        const authData = await userSignIn(email, password);
        const { record: user, token } = authData;
        const authInfo = { user, token };
        setStorageData(AUTH_KEY, authInfo);
        navigate('/home');
      } catch (error) {
        if (error.message.includes('Failed to authenticate.')) {
          toast.error((t) => (
            <div className="flex flex-row gap-2 text-base">
              <span>잘못된 회원정보 입니다.</span>
              <button
                className=" rounded-sm font-semibold"
                onClick={() => toast.dismiss(t.id)}
              >
                닫기
              </button>
            </div>
          ));
        } else {
          console.log('user data fetching error:', error);
        }
      }
    },
    [formState, navigate]
  );

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

  const { email, password } = formState;

  const isDisabled =
    isValidEmail(email) && isValidLoginPwd(password) ? false : true;

  const emailError = (email) => {
    if (email.length === 0) {
      return null;
    }
    if (!isValidEmail(email)) {
      return (
        <div className="text-negative text-sm font-semibold">
          잘못된 이메일 형식입니다.
        </div>
      );
    }
  };
  const pwdError = (password) => {
    if (password.length === 0) {
      return;
    }
    if (!isValidLoginPwd(password)) {
      return (
        <div className="text-negative text-sm font-semibold">
          비밀번호는 8자 이상, 15자 이하여야 합니다.
        </div>
      );
    }
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
      <div>
        <Toaster />
      </div>
      <div className="p-3">
        <div className="h-[180px] flex flex-col justify-end text-lg font-semibold mb-[47px]">
          <h1>환영합니다!</h1>
          <h1>가입된 이메일로 로그인 해주세요!</h1>
        </div>

        <form className="flex flex-col gap-[17px]" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-[17px]">
            <label className="text-lg font-semibold">이메일</label>
            <div className="flex flex-col gap-1">
              <InputText
                name="email"
                inputType={'email'}
                onChange={handleEmailInput}
                placeholder="이메일을 작성해주세요"
              />
              {emailError(email)}
            </div>
          </div>
          <div className="flex flex-col gap-[17px]">
            <label className="text-lg font-semibold">비밀번호</label>
            <div className="flex flex-col gap-1">
              <InputText
                name="password"
                inputType={'password'}
                onChange={handlePasswordInput}
                placeholder="비밀번호를 작성해주세요"
              />
              {pwdError(password)}
            </div>
          </div>
          <NormalButton
            btnType="submit"
            label="로그인"
            isDisabled={isDisabled}
          />
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
