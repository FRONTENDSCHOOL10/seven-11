import pb from '@/api/pb';
import QuestionList from '@/components/QuestionList';
import SelectButton from '@/components/SelectButton';
import useCategoryStore from '@/stores/useCategoryStore';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

export function Component() {
  const [questionList, setQuestionList] = useState([]);
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoryStore((s) => ({
      categories: s.categories,
      selectedCategory: s.selectedCategory,
      setSelectedCategory: s.setSelectedCategory,
    }));

  // 카테고리 옵션 설정
  const options = [
    { value: '전체', label: '전체' },
    ...categories.map((category) => ({
      value: category.id,
      label: category.category_name,
    })),
  ];

  // 질문 게시글 리스트 가져오기
  const questionListFetch = useCallback(async () => {
    try {
      const data = await pb.collection('Question_Posts').getList(1, 20, {
        sort: '-created',
      });

      const newList = data.items.filter((item) =>
        categories.some((category) => category.id === item.category)
      );

      setQuestionList(newList);
    } catch (error) {
      console.error('질문 게시글 리스트를 가져오는 데 실패했습니다.:', error);
    }
  }, [categories]);

  useEffect(() => {
    questionListFetch();
  }, [questionListFetch]);

  // 선택된 카테고리로 필터링된 질문 리스트
  const filteredQuestionList = useMemo(() => {
    if (selectedCategory === '전체') {
      return questionList.filter((item) =>
        categories.some((category) => category.id === item.category)
      );
    } else if (selectedCategory) {
      return questionList.filter((item) => item.category === selectedCategory);
    } else {
      return questionList;
    }
  }, [questionList, selectedCategory, categories]);

  return (
    <>
      <Helmet>
        <title>작심하루 - 질문게시판</title>
        <meta
          name="description"
          content="질문 게시판을 통해 궁금증에 대한 답변을 찾아 보세요."
        />
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="border-b border-gray-300 pl-3 py-2">
          <SelectButton
            options={options}
            onSelect={(value) => setSelectedCategory(value)}
          />
        </div>
        <div className="pb-[60px] overflow-y-auto no-scrollbar">
          <div>
            {filteredQuestionList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[575px]">
                질문 게시글이 없습니다.
              </div>
            ) : (
              filteredQuestionList.map((item) => (
                <QuestionList key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </Suspense>
    </>
  );
}
