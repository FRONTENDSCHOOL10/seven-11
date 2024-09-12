import { CheckButton } from '@/components';
import LeftIcon from '@/components/LeftIcon';
import SmallText from '@/components/SmallText';
import SubTitle from '@/components/SubTitle';
import { Link } from 'react-router-dom';

export default function CheckEmail() {
  return (
    <>
      <div className="ml-3 my-5">
        <LeftIcon />
      </div>
      <div className="flex flex-col items-center justify-center">
        <svg
          role="img"
          aria-label="현재 위치"
          className="svg-icon  w-[230px] h-[180px] mt-[150px] mb-[20px] "
        >
          <use href="/logo2.svg#image0_3724_1535" />
        </svg>

        <div className=" flex flex-col items-center justify-center mb-[20px]">
          <SubTitle
            title="메일함을 확인해주세요"
            font="text-[22px]"
            color="text-primary"
          />

          <SmallText
            title="이메일 인증을 완료해주세요"
            font="text-[16px]"
            color="text-gray-300"
          />
        </div>
        <div className="mt-[130px] mb-[20px]">
          <Link className="text-primary" to={'/login'}>
            <CheckButton
              label="로그인"
              textColor="text-white"
              bgColor="bg-primary"
              border="border-none"
              rounded="rounded-[8px]"
            />
          </Link>
        </div>

        <div className="text-sm flex justify-center items-center gap-3 mb-[20px]">
          <span className="text-gray-300">회원이 아니신가요?</span>
          <Link className="text-primary" to={'/signup'}>
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
}
