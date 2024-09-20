import { CheckButton } from '@/components';
import SmallText from '@/components/SmallText';
import SubTitle from '@/components/SubTitle';
import { getStorageData } from '@/utils';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const AUTH_KEY = 'authInfo';

  useEffect(() => {
    const authInfo = getStorageData(AUTH_KEY);
    if (authInfo?.token) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <>
      <div className="flex flex-col items-center justify-center content-center ">
        <svg
          role="img"
          aria-label="현재 위치"
          className="svg-icon  w-[230px] h-[180px] mt-[120px] "
        >
          <use href="/logo2.svg#image0_3724_1535" />
        </svg>
        <div className="mb-[30px]">
          <SubTitle
            title="작심하루"
            font="text-[40px]"
            color="text-primary"
            fontFamily="font-uhbee"
            fontWeight="font-normal"
          />
        </div>
        <SubTitle
          title="당신 곁에 작심하루"
          font="text-[20px]"
          color="text-primary"
        />
        <SmallText
          title="하루라도, 작심하루와 공부하기!"
          font="text-[16px]"
          color="text-gray-300"
        />
        <div className="mt-[160px]">
          <Link to={'/categories'}>
            <CheckButton
              label="시작하기"
              textColor="text-white"
              bgColor="bg-primary"
              border="border-none"
              rounded="rounded-[8px]"
            />
          </Link>
        </div>

        <div className="text-sm flex justify-center h-[70px] items-center gap-3">
          <span className="text-gray-300">이미 계정이 있나요?</span>
          <Link className="text-primary" to={'/login'}>
            로그인
          </Link>
        </div>
      </div>
    </>
  );
}
