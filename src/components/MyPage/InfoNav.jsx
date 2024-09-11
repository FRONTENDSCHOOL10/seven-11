import { signOut } from '@/api/user';
import InfoContent from './InfoContent';
import { getStorageData } from '@/utils';
import { useNavigate } from 'react-router-dom';

function InfoNav() {
  const user = getStorageData('authInfo').user;
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-[18px] p-4">
      <InfoContent>설정</InfoContent>
      <InfoContent>서비스 정보</InfoContent>
      <InfoContent>공지사항</InfoContent>
      <InfoContent
        isMoreInfo={true}
        userId={user.nickname}
        handleLogout={handleLogout}
      >
        로그아웃
      </InfoContent>
    </div>
  );
}

export default InfoNav;
