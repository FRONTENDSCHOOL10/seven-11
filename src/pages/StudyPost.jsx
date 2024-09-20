import { CategoryDropdown, LeftIcon, PostOptionList } from '@/components';
import NormalButton from '@/components/NormalButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '@/api/pb';
import usePostOptionsStore from '@/stores/usePostOptionsStore';

export default function StudyPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const { options } = usePostOptionsStore();

  const handleNextPage = async () => {
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Category:', category);
    console.log('Options:', options);

    if (!title || !content || !category) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    setLoading(true);

    try {
      const data = {
        title,
        content,
        category,
        people: options.people,
        date: options.date,
        time: options.time,
        gender: options.gender,
        location: options.location,
      };

      await pb.collection('Study_Posts').create(data);
      setLoading(false);

      navigate('/next-page');
    } catch (error) {
      console.error('스터디 등록 실패:', error);
      alert('스터디 등록 중 오류가 발생했습니다.');
      setLoading(false);
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
      <CategoryDropdown onSelect={(value) => setCategory(value)} />
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

      <NormalButton
        onClick={handleNextPage}
        label={loading ? '저장 중...' : '다음'}
        disabled={loading}
      />
    </>
  );
}
