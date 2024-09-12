import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';
import { getTimeDifference } from '@/utils/getTimeDifference';
import Badge from '../Badge';
import LocationTime from '../Chat/LocationTime';
import pb from '@/api/pb';
import getDetailedAddress from '@/utils/getDetailedAddress';

StudyPostItem.propTypes = {
  item: object.isRequired,
};

function StudyPostItem({ item }) {
  const [category, setCategory] = useState(null);
  const [chatroom, setChatroom] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (item.category) {
        try {
          const data = await pb.collection('Categories').getOne(item.category);
          setCategory(data);
        } catch (error) {
          console.error(
            '카테고리 정보를 가져오는 중 오류가 발생했습니다:',
            error
          );
        }
      }
    };
    fetchCategory();
  }, [item.category]); // 이 값이 변경될때만 새로운 카테고리 데이터 가져오도록

  useEffect(() => {
    const fetchChatroom = async () => {
      if (item.chatroom) {
        try {
          const chatroom = await pb
            .collection('ChatRooms')
            .getOne(item.chatroom);
          setChatroom(chatroom);
        } catch (error) {
          console.error(
            '채팅방 정보를 가져오는 중 오류가 발생했습니다:',
            error
          );
        }
      }
    };
    fetchChatroom();
  }, [item.chatroom]);

  // 주소 가져오기
  const address = item.place;
  const detailedAddress = getDetailedAddress(address);

  // 참여중 인원수
  const joinedPeople = chatroom ? chatroom.user.length : '';

  return (
    <Link
      to="#"
      className="h-full bg-white p-3 flex justify-between border-b border-gray-200"
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
          <span>{`${item.gender} 참여가능`}</span>
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
            {joinedPeople}/{item.people}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default StudyPostItem;
