import React, { useState, useEffect } from 'react';
import LeftIcon from '@/components/LeftIcon';
import SearchBar from '@/components/SearchBar';
import SelectButton from '@/components/SelectButton';
import { Helmet } from 'react-helmet-async';
import { SubTitle } from '@/components';
import pb from '@/api/pb'; // 수정된 pb.js 파일 임포트

export default function Search() {
  const [selectedOption, setSelectedOption] = useState('전체');
  const [options, setOptions] = useState([{ value: '전체', label: '전체' }]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const records = await pb.collection('Categories').getFullList();
        const categories = records.map((category) => ({
          value: category.id,
          label: category.category_name,
        }));
        setOptions([{ value: '전체', label: '전체' }, ...categories]);
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 데 실패했습니다:', error);
        setError('카테고리 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchQuestions(selectedOption);
  }, [selectedOption]);

  const handleSelect = (value) => {
    setSelectedOption(value);
    console.log('Selected category:', value); // 선택된 카테고리 확인
  };

  const fetchQuestions = async (category) => {
    setLoading(true);
    setError(null);
    try {
      let filter = '';
      if (category !== '전체') {
        // filter 변수에 카테고리 필드명을 포함하여 설정
        filter = `'${category}'`; // 카테고리 id로 필터링
        console.log(category);
      }

      const records = await pb.collection('Question_Posts').getFullList({
        filter: filter, // 필터 적용
      });

      console.log('Fetched questions:', records); // 데이터 확인
      setQuestions(records);
    } catch (error) {
      console.error('질문 데이터를 가져오는 데 실패했습니다:', error);
      setError('질문 데이터를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>검색 페이지</title>
        <meta
          name="description"
          content="다양한 스터디 모집 글을 검색하고 참여하세요. 원하는 스터디를 쉽게 찾을 수 있습니다."
        />
      </Helmet>
      <div className="px-4 py-4">
        <h1 className="text-xl font-semibold">서치페이지</h1>
        <div className="flex items-center py-2 gap-4">
          <LeftIcon />
          <SearchBar location="근처에서 검색" />
        </div>

        <div>
          <SubTitle title="친구들이 많이 찾고 있어요." font="text-[14px]" />
        </div>

        <div className="mt-4">
          <SelectButton options={options} onSelect={handleSelect} />
        </div>

        <div className="mt-6">
          {loading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : questions.length > 0 ? (
            <QuestionList questions={questions} />
          ) : (
            <p>해당 카테고리에 게시글이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

function QuestionList({ questions }) {
  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id} className="py-2 border-b">
          <h3 className="text-lg font-semibold">{question.title}</h3>
          <p className="text-sm">{question.content}</p>
        </li>
      ))}
    </ul>
  );
}
