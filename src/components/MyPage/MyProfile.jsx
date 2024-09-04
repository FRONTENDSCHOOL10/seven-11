import { memo } from 'react';
import ProfileImg from './ProfileImg';

function MyProfile() {
  return (
    <div className="flex items-center flex-col gap-[9px] mt-[42px]">
      <ProfileImg
        width={68}
        height={68}
        userImg="/favicon.svg"
        isHiddenSVG={true}
      />
      <div className='flex flex-col items-center'>
        <div className="flex flex-row items-center gap-[6px]">
          <div className="text-lg font-semibold">박윤선</div>
          <span className="text-sm text-secondary border border-secondary rounded-full px-1 flex items-center ">
            고인물
          </span>
        </div>
        <div className="text-sm text-gray-300">답변 35</div>
      </div>
    </div>
  );
}

export default memo(MyProfile);
