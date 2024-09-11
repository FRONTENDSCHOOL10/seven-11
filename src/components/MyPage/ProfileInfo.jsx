import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from './ProfileImg';
import useProfileStore from '@/stores/useProfileStore';
import { getStorageData } from '@/utils';

function ProfileInfo() {
  const { userList, fetchUserList } = useProfileStore();

  const userData = getStorageData('authInfo');

  if (userData) {
    useEffect(() => {
      fetchUserList(userData.user.id);
    }, [fetchUserList]);
  }

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
        {userList.map((item, index) => (
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
