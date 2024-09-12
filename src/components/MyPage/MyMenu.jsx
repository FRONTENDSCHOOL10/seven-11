import { memo } from 'react';
import MyMenuIcon from './MyMenuIcon';

function MyMenu() {
  return (
    <div className="flex flex-row gap-[52px] justify-center mt-[15px] mb-[18px]">
      <MyMenuIcon iconTitle={'나의 Q&A'} iconId={'qna'} />
      <MyMenuIcon
        iconTitle={'나의 프로필'}
        iconId={'my'}
        to="/home/user-info/profile-edit"
      />
      <MyMenuIcon iconTitle={'나의 Q&A'} iconId={'alarmBell'} />
    </div>
  );
}

export default memo(MyMenu);
