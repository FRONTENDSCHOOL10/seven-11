import { memo } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from './ProfileImg';
import pb from '@/api/pb';
import getAge from '@/utils/getAge';

const user = await pb.collection('users').getOne('3446i6zpwmwme3w');
const profileData = await pb
  .collection('User_Profile')
  .getFirstListItem(`user="${user.id}"`);

console.log(profileData);

const age = getAge(user.birth_date);

const list = [
  {
    title: '프로필 사진',
    img: `${pb.files.getUrl(user, user.avatar)}`,
  },
  {
    title: '닉네임',
    description: `${user.nickname}`,
  },
  {
    title: '성별',
    description: `${user.gender}`,
  },
  {
    title: '연령',
    description: `${age}`,
  },
  {
    title: '직업',
    description: `${profileData.job}`,
  },
  {
    title: '자격',
    description: `${profileData.license}`,
  },
];

function ProfileInfo() {
  return (
    <div className="w-full bg-white rounded-lg font-semibold">
      <div className="flex justify-between border-b border-gray-300 p-3">
        <span className="text-base">기본정보</span>
        <Link
          to={'/home/user-info/profile-detail'}
          className="text-sm text-secondary"
        >
          수정하기
        </Link>
      </div>
      <ul className="flex flex-col">
        {list.map((item, index) => (
          <li key={index} className="flex justify-between p-3 items-center">
            <span className="text-base">{item.title}</span>
            {item.img ? (
              <ProfileImg
                isHiddenSVG={true}
                userImg={item.img}
                width={24}
                height={24}
              />
            ) : (
              <span
                className={`text-sm font-semibold ${item.title === '닉네임' ? '' : 'text-gray-300'}`}
              >
                {item.description}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(ProfileInfo);
