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
    const fetch = async () => {
      const data = await pb.collection('Categories').getOne(item.category);
      setCategory(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const chatroom = await pb.collection('ChatRooms').getOne(item.chatroom);
      setChatroom(chatroom);
    };
    fetch();
  }, []);

  // 주소 가져오기
  const address = item.place;
  const detailedAddress = getDetailedAddress(address);

  // 참여중 인원수
  const joinedPeople = chatroom ? chatroom.user.length : '';

  return (
    <Link
      to="#"
      className="h-full bg-white p-3 flex justify-between border-b border-gray-400"
    >
      <div>
        <Badge
          label={category ? category.category_name : ''}
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
