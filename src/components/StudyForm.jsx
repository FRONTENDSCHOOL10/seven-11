import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/api/pb';
import { CategoryDropdown, LeftIcon, PostOptionList } from '@/components';
import NormalButton from '@/components/NormalButton';
import usePostOptionsStore from '@/stores/usePostOptionsStore';
import { object, string } from 'prop-types';

StudyForm.propTypes = {
  mode: string,
  studyData: object,
};

function StudyForm({ mode = 'create', studyData }) {
  const navigate = useNavigate();
  const { options, setOptions } = usePostOptionsStore();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (mode === 'edit' && studyData) {
      setFormData({
        title: studyData.title,
        content: studyData.content,
        category: studyData.category,
      });

      // Option 데이터를 studyData에서 설정
      setOptions({
        people: studyData.people,
        date: studyData.date,
        time: studyData.time,
        gender: studyData.gender,
        location: studyData.location,
      });
    }
  }, [studyData, mode, setOptions]);

  useEffect(() => {
    const { title, content, category } = formData;
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
  }, [formData, options]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const user = pb.authStore.model;

    if (!user) {
      alert('로그인된 사용자 정보를 찾을 수 없습니다. 다시 로그인해 주세요.');
      return;
    }

    try {
      let postId;

      if (mode === 'create') {
        const studyPost = {
          ...formData,
          user: user.id,
          people: options.people,
          date: options.date,
          time: options.time,
          gender: options.gender,
          location: options.location,
        };
        const createdPost = await pb
          .collection('Study_Posts')
          .create(studyPost);
        postId = createdPost.id;

        const chatRoomData = {
          roomName: `${formData.title}`,
          user: [user.id],
          study: postId,
          message: [],
        };

        const createdChatRoom = await pb
          .collection('ChatRooms')
          .create(chatRoomData);

        await pb
          .collection('Study_Posts')
          .update(postId, { chatroom: createdChatRoom.id });
      } else if (mode === 'edit') {
        const updatedData = {
          ...formData,
          people: options.people,
          date: options.date,
          time: options.time,
          gender: options.gender,
          location: options.location,
        };
        await pb.collection('Study_Posts').update(studyData.id, updatedData);
        postId = studyData.id;
      }

      navigate(`/home/study-detail/${postId}`);
    } catch (error) {
      console.error('스터디 등록/수정 실패:', error.message);
      alert('스터디 등록/수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <form name="스터디 게시글" onSubmit={(e) => e.preventDefault()}>
      <div className="w-full px-4 py-2">
        <LeftIcon />
      </div>
      <fieldset>
        <label className="sr-only">스터디 제목</label>
        <input
          type="text"
          name="title"
          className="block w-full px-3 py-2 text-lg focus:outline-none"
          placeholder="스터디 제목을 입력하세요"
          value={formData.title}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset>
        <CategoryDropdown
          onSelect={(id) => setFormData((prev) => ({ ...prev, category: id }))}
        />
      </fieldset>
      <fieldset>
        <label className="sr-only">활동 내용</label>
        <textarea
          className="w-full px-3 py-4 min-h-[200px] border-b border-gray-200 text-base focus:outline-none resize-none"
          name="content"
          placeholder="활동 내용을 입력하세요"
          value={formData.content}
          onChange={handleChange}
        />
      </fieldset>
      <PostOptionList />
      <div className="flex justify-center px-3">
        <NormalButton
          onClick={handleSubmit}
          label={'저장'}
          isDisabled={isButtonDisabled}
        />
      </div>
    </form>
  );
}

export default memo(StudyForm);
