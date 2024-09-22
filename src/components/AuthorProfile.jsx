import pb from '@/api/pb';
import { useEffect, useState } from 'react';
import useUserStore from '../stores/useAuthorStore';

function AuthorProfile() {
  const postAuthorId = useUserStore((state) => state.postAuthorId);

  const [authorData, setAuthorData] = useState({
    nickname: '',
    avatar: '',
    address: '',
  });

  //  구까지만 표시
  const formatAddress = (fullAddress) => {
    if (!fullAddress) return '';

    const addressParts = fullAddress.split(' ');

    return addressParts.length >= 2
      ? `${addressParts[0]} ${addressParts[1]}`
      : fullAddress;
  };

  useEffect(() => {
    async function fetchAuthorData() {
      try {
        // 작성자 정보 가져오기
        const author = await pb.collection('users').getOne(postAuthorId);
        console.log('Author Data:', author);

        setAuthorData({
          nickname: author.nickname,
          avatar: pb.files.getUrl(author, author.avatar),
          address: formatAddress(author.address), // "구"까지만 가져옴
        });
      } catch (error) {
        console.error('작성자 정보를 불러오는 중 오류가 발생했습니다:', error);
      }
    }

    if (postAuthorId) {
      fetchAuthorData();
    }
  }, [postAuthorId]);

  return (
    <div className="flex items-center gap-2.5">
      {authorData.avatar ? (
        <img
          src={authorData.avatar}
          alt="작성자 프로필 사진"
          className="w-[30px] h-[30px] rounded-full"
        />
      ) : (
        <img
          src="/logo.svg"
          alt="작성자 프로필 사진"
          className="w-[30px] h-[30px] rounded-full"
        />
      )}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold">{authorData.nickname}</span>
          <div className="flex items-center space-x-[1px]">
            <svg className="w-[17px] h-[17px]">
              <use href="/stack.svg#organizer" />
            </svg>
            <span className="text-sm">모임장</span>
          </div>
        </div>
        <span className="text-sm text-gray-400">{authorData.address}</span>
      </div>
    </div>
  );
}

export default AuthorProfile;
