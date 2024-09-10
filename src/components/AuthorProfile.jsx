import pb from '@/api/pb';
import { useEffect, useState } from 'react';
import useUserStore from '../stores/useUserStore';

function StudyAuthorProfile() {
  // 기존 useUseStore 에서 postAuthorId 가져오기
  const postAuthorId = useUserStore((state) => state.postAuthorId);

  const [authorData, setAuthorData] = useState({
    nickname: '',
    avatar: '',
    address: '',
  });

  useEffect(() => {
    async function fetchAuthorData() {
      try {
        // 아까 postAuthorId를 사용하여 작성자 정보 가져옴
        const author = await pb.collection('users').getOne(postAuthorId);
        console.log('Author Data:', author); // 데이터 확인

        setAuthorData({
          nickname: author.nickname,
          avatar: pb.files.getUrl(author, author.avatar),
          address: author.address,
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
    <div className="flex items-center">
      <div>
        <img
          src={authorData.avatar}
          alt="작성자 아바타"
          className="w-50 h-30 rounded-full mr-2"
        />
        <span className="block font-bold">{authorData.nickname}</span>
      </div>
      <span className="text-sm text-gray-500">{authorData.address}</span>
    </div>
  );
}

export default StudyAuthorProfile;
