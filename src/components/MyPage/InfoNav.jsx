import InfoContent from './InfoContent';

function InfoNav() {
  return (
    <div className="flex flex-col gap-[18px] p-4">
      <InfoContent>설정</InfoContent>
      <InfoContent>서비스 정보</InfoContent>
      <InfoContent>공지사항</InfoContent>
      <InfoContent isMoreInfo={true} userId={'kimchihi'}>
        로그아웃
      </InfoContent>
    </div>
  );
}

export default InfoNav;
