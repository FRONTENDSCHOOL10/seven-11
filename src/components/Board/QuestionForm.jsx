import { memo, useState } from 'react';
import PostImgButton from './PostImgButton';
import SelectCategory from './SelectCategory';
import pb from '@/api/pb';
import { getStorageData } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { convertHTMLToText } from '@/utils/convertHTMLToText';
import { object, string } from 'prop-types';
import NormalButton from '../NormalButton';

QuestionForm.propTypes = {
  mode: string,
  note: object,
};

function QuestionForm({ mode = 'create', note }) {
  const user = getStorageData('authInfo').user;
  const userID = user.id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    if (mode === 'create') {
      return {
        userID: userID,
        title: '',
        content: '',
        category: '',
        thumbnail: [],
      };
    }

    if (mode === 'edit' && note) {
      return {
        userID: note.userID,
        title: note.title,
        content: convertHTMLToText(note.content),
        category: note.category,
        thumbnail: note.thumbnail,
      };
    }
  });

  const handleSelectImg = (images) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: images,
    }));
  };


  const handleSubmit = async () => {
    const form = new FormData();

    form.append('userID', formData.userID);
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('category', formData.category);

    formData.thumbnail.forEach((image) => {
      form.append(`thumbnail`, image);
    });

    try {
      if (
        formData.title === '' ||
        formData.content === '' ||
        formData.category === ''
      ) {
        alert('모두 입력을 완료해주세요!');
        return;
      }
      const response = await pb.collection('Question_Posts').create(form);
      const postId = response.id;

      navigate(`/home/board/qna-detail/${postId}`);
    } catch (error) {
      console.error('게시글 포스팅 실패:', error);
    }
  };

  const handleSelectCategory = (value) => {
    pb.collection('Categories')
      .getFirstListItem(`category_name="${value}"`)
      .then((category) =>
        setFormData((prev) => ({
          ...prev,
          category: category.id,
        }))
      );
  };

  return (
    <form name="질문 게시글" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <label className="sr-only">질문 제목</label>
        <input
          className="w-full placeholder:text-gray-400 px-[27.5px] py-3 tex-lg font-semibold outline-none"
          placeholder="질문제목"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </fieldset>
      <SelectCategory onClick={handleSelectCategory} />
      <div>
        <fieldset>
          <label className="sr-only">내용 입력</label>
          <textarea
            className="w-full h-[407px] px-3 py-2 resize-none placeholder-gray-400 text-base outline-none focus-visible:outline"
            placeholder="내용을 입력해주세요."
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
          />
        </fieldset>
        <fieldset className="px-3">
          <label className="sr-only">이미지 선택</label>
          <PostImgButton onClick={handleSelectImg} />
        </fieldset>
      </div>
      <div className="px-3">
        <NormalButton onClick={handleSubmit} label="저장" />
      </div>
    </form>
  );
}

export default memo(QuestionForm);
