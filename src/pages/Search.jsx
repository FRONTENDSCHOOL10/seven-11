import React, { useState, useEffect } from 'react';
import LeftIcon from '@/components/LeftIcon';
import SearchBar from '@/components/SearchBar';
import SelectButton from '@/components/SelectButton';
import { Helmet } from 'react-helmet-async';
import { SubTitle } from '@/components';
import pb from '@/api/pb'; // 수정된 pb.js 파일 임포트

export default function Search() {
  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState([{ value: '', label: '전체' }]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

  // 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null); // 에러 상태 초기화
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

  // 질문 데이터 불러오기
  useEffect(() => {
    if (selectedOption || searchTerm) {
      fetchQuestions(selectedOption, searchTerm); // 검색어를 추가로 전달
    }
  }, [selectedOption, searchTerm]);

  // 선택된 카테고리 처리
  const handleSelect = (value) => {
    setSelectedOption(value);
    setQuestions([]); // 새로운 카테고리 선택 시 질문 초기화
  };

  // 질문 목록 불러오기
  const fetchQuestions = async (category, searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      // 카테고리와 검색어를 필터에 반영
      const filter = [];
      if (category !== '전체') filter.push(`category='${category}'`);
      if (searchTerm) filter.push(`title~'${searchTerm}'`); // 부분 일치 검색

      const filterQuery = filter.join(' && '); // 필터 쿼리 조합

      const records = await pb.collection('Question_Posts').getFullList({
        filter: filterQuery, // 필터 적용
      });
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
        <div className="flex items-center py-2 gap-4">
          <LeftIcon />
          <SearchBar
            location="검색할 내용을 입력해 주세요."
            onChange={setSearchTerm} // 검색어 변경 시 상태 업데이트
          />
        </div>

        <div className="mt-2">
          <SubTitle title="친구들이 많이 찾고 있어요!" font="text-[14px]" />
        </div>

        <div className="mt-4">
          <SelectButton options={options} onSelect={handleSelect} />
        </div>

        <div className="mt-6">
          {loading ? (
            <p></p>
          ) : error ? (
            <p>{error}</p>
          ) : questions.length > 0 ? (
            <QuestionList questions={questions} />
          ) : (
            <p></p>
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
