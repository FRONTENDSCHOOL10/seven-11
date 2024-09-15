import QuestionList from '@/components/QuestionList';
import SelectButton from '@/components/SelectButton';
import useCategoryStore from '@/stores/useCategoryStore';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

export function Component() {
  const { categories } = useCategoryStore();

  const options = [
    { value: '전체', label: '전체' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.category_name,
    })),
  ];

  return (
    <>
      <Helmet>
        <title>작심하루 - 질문게시판</title>
        <meta
          name="description"
          content="질문 게시판을 통해 궁금증에 대한 답변을 찾아 보세요. "
        />
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="border-b border-gray-300 pl-3 py-2">
          <SelectButton options={options} />
        </div>

        <QuestionList
          tag="일본어"
          title="깊은 복사 얕은..."
          description="제가 이해한... "
          timeAgo="15분 전"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB"
        />
        <QuestionList
          tag="자바스크립트"
          title="깊은 복사 얕은 복사의 차이를 ..."
          description="제가 이해한 내용은 얕은 복사는..."
          timeAgo="15분 전"
        />
      </Suspense>
    </>
  );
}
