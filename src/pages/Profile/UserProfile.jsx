import pb from '@/api/pb';
import { LeftIcon } from '@/components';
import { ContentNav, MyProfile, Temperature } from '@/components/MyPage';
import UserProfileInfo from '@/components/MyPage/UserProfileInfo';
import getAge from '@/utils/getAge';
import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    pb.collection('users')
      .getOne(id)
      .then((r) => setUserData(r));
  }, [id]);


  const birth = userData?.birth_date;
  const age = getAge(birth);

  return (
    <div>
      <div className="mt-2 ml-1">
        <LeftIcon />
      </div>
      <MyProfile user={userData} />
      <div className="mt-3">
        <Temperature temp={userData.userTemp || 36.5} />
      </div>

      <ContentNav isSvgHidden={true} title="회원정보" />

      <div className="flex flex-col px-[18px] pt-4 gap-[18px]">
        <UserProfileInfo title="연령" info={age} />
        <UserProfileInfo title="성별" info={userData?.gender} />
        <UserProfileInfo title="직업" info={userData?.job} />
        <UserProfileInfo title="자격증" info={userData?.license} />
      </div>
    </div>
  );
}

export default memo(UserProfile);
