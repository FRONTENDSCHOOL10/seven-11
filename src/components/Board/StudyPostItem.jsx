import pb from '@/api/pb';
import getDetailedAddress from '@/utils/getDetailedAddress';
import { getTimeDifference } from '@/utils/getTimeDifference';
import { arrayOf, object } from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../Badge';
import LocationTime from '../Chat/LocationTime';

StudyPostItem.propTypes = {
  item: object.isRequired,
  categories: arrayOf(object).isRequired,
};

function StudyPostItem({ item, categories }) {
  const [chatroom, setChatroom] = useState(null);

  const category = categories.find((cat) => cat.id === item.category) || {
    category_name: '카테고리 없음',
  };

  useEffect(() => {
    const fetchChatroom = async () => {
      try {
        if (item.chatroom) {
          const chatroomData = await pb
            .collection('ChatRooms')
            .getOne(item.chatroom);
          setChatroom(chatroomData);
        } else {
          setChatroom(null);
        }
      } catch (error) {
        console.error('채팅방 정보를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchChatroom();
  }, [item.chatroom]);

  const address = item.location;
  const detailedAddress = getDetailedAddress(address);

  const joinedPeople = chatroom ? chatroom.user.length : '0';

  return (
    <Link
      to={`/home/study-detail/${item.id}`}
      className="w-full h-full bg-white p-3 flex justify-between border-b border-gray-200"
    >
      <div>
        <Badge
          label={category ? category.category_name : '카테고리 없음'}
          isPrimary={false}
        />
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
