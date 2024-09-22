import pb from '@/api/pb';
import { CategoryDropdown, LeftIcon, PostOptionList } from '@/components';
import NormalButton from '@/components/NormalButton';
import usePostOptionsStore from '@/stores/usePostOptionsStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudyPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 활성화 상태
  const { options } = usePostOptionsStore();

  useEffect(() => {
    if (
      title.trim() &&
      content.trim() &&
      category &&
      options.people &&
      options.date &&
      options.time &&
      options.gender &&
      options.location
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [title, content, category, options]);

  const handleNextPage = async () => {
    const user = pb.authStore.model;

    if (!user) {
      alert('로그인된 사용자 정보를 찾을 수 없습니다. 다시 로그인해 주세요.');
      return;
    }

    try {
      // 1. 스터디 포스트 생성
      const studyData = {
        user: user.id,
        title,
        content,
        category,
        people: options.people,
        date: options.date,
        time: options.time,
        gender: options.gender,
        location: options.location,
      };

      const createdPost = await pb.collection('Study_Posts').create(studyData);

      const chatRoomData = {
        roomName: `${title}`,
        user: [user.id],
        study: createdPost.id,
        message: [],
      };

      const createdChatRoom = await pb
        .collection('ChatRooms')
        .create(chatRoomData);

      await pb.collection('Study_Posts').update(createdPost.id, {
        chatroom: createdChatRoom.id,
      });

      navigate(`/home/study-detail/${createdPost.id}`);
    } catch (error) {
      console.error('스터디 등록 및 채팅방 생성 실패:', error.message);
      alert('스터디 등록 및 채팅방 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="w-full px-4 py-2">
        <LeftIcon />
      </div>
      <div>
        <input
          type="text"
          id="title"
          className="block w-full px-3 py-2 text-lg focus:outline-none"
          placeholder="스터디 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <CategoryDropdown onSelect={(id) => setCategory(id)} />
      <div className="">
        <textarea
          className="w-full px-3 py-4 min-h-[200px] border-b border-gray-200 text-base focus:outline-none resize-none"
          placeholder="활동 내용을 입력하세요"
          value={content}
          id="content"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <PostOptionList />

      <div className="flex justify-center">
        <NormalButton
          onClick={handleNextPage}
          label={'저장'}
          isDisabled={isButtonDisabled}
        />
      </div>
    </>
  );
}
