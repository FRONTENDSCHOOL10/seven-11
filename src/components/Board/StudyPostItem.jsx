import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { object, arrayOf, shape, string } from 'prop-types';
import { getTimeDifference } from '@/utils/getTimeDifference';
import Badge from '../Badge';
import LocationTime from '../Chat/LocationTime';
import pb from '@/api/pb';
import getDetailedAddress from '@/utils/getDetailedAddress';

StudyPostItem.propTypes = {
  item: object.isRequired,
  categories: arrayOf(
    shape({
      id: string.isRequired,
      category_name: string.isRequired,
    })
  ).isRequired, // 카테고리 리스트도 prop으로 전달받음
};

function StudyPostItem({ item, categories }) {
  const [categoryName, setCategoryName] = useState('카테고리 없음');
  const [chatroom, setChatroom] = useState(null);

  useEffect(() => {
    // 카테고리 ID를 기반으로 카테고리 이름 설정
    const category = categories.find((cat) => cat.id === item.category);
    if (category) {
      setCategoryName(category.category_name);
    }

    const fetchChatroom = async () => {
      try {
        if (item.chatroom) {
          const chatroomData = await pb
            .collection('ChatRooms')
            .getOne(item.chatroom);
          setChatroom(chatroomData);
        }
      } catch (error) {
        console.error(
          '채팅방 데이터를 가져오는 중 오류가 발생했습니다:',
          error
        );
      }
    };

    fetchChatroom();
  }, [item.category, item.chatroom, categories]);

  const address = item.location;
  const detailedAddress = getDetailedAddress(address);

  const joinedPeople = chatroom ? chatroom.user.length : '0';

  return (
    <Link
      to={`/home/study-detail/${item.id}`} // 각 스터디의 상세 페이지로 이동하는 링크
      className="w-full h-full bg-white p-3 flex justify-between border-b border-gray-200"
    >
      <div>
        <Badge label={categoryName} isPrimary={false} />
        <h3>{item.title}</h3>
        <div className="flex flex-row text-base items-center gap-[2px] text-[#B1B4C3] mb-[5px]">
          <svg className="w-[14px] h-[14px]">
            <use href="/stack.svg#fullPeople" />
          </svg>
          <span>{`${item.gender || '모두'} 참여가능`}</span>
        </div>
        <LocationTime
          time={getTimeDifference(item.created)}
          location={detailedAddress}
        />
      </div>
      <div className="flex items-end">
        <div className="flex text-base items-center gap-[2px] text-[#B1B4C3]">
          <svg className="w-[14px] h-[14px]">
            <use href="/stack.svg#people" />
          </svg>
          <span>
            {joinedPeople}/{item.people || '0'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default StudyPostItem;
