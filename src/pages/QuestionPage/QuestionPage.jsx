import pb from '@/api/pb';
import QuestionList from '@/components/QuestionList';
import SelectButton from '@/components/SelectButton';
import useCategoryStore from '@/stores/useCategoryStore';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export function Component() {
  const [questionList, setQuestionList] = useState([]);
  const { categories } = useCategoryStore();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);

  const options = [
    { value: '전체', label: '전체' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.category_name,
    })),
  ];

  const questionListFetch = useCallback(async () => {
    if (questionList.length === 0) {
      try {
        const data = await pb.collection('Question_Posts').getFullList();
        setQuestionList(data);
      } catch (error) {
        console.error('질문 게시글 리스트를 가져오는 데 실패했습니다.:', error);
      }
    }
  }, [questionList]);

  useEffect(() => {
    questionListFetch();
  }, [questionListFetch]);

  const filteredQuestionList = selectedCategory
    ? questionList.filter((item) => item.category === selectedCategory)
    : questionList; // 선택된 카테고리가 없으면 전체 게시글 표시

  if (!categories || categories.length === 0) {
    return <div>페이지 로딩중...</div>;
  }

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
        {filteredQuestionList.map((item) => (
          <QuestionList key={item.id} item={item} questionList={item} />
        ))}
      </Suspense>
    </>
  );
}
