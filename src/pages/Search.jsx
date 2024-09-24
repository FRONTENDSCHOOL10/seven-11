import React, { useState, useEffect } from 'react';
import LeftIcon from '@/components/LeftIcon';
import SearchBar from '@/components/SearchBar';
import SelectButton from '@/components/SelectButton';
import { Helmet } from 'react-helmet-async';
import { SubTitle } from '@/components';
import pb from '@/api/pb'; // 수정된 pb.js 파일 임포트
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

export default function Search() {
  const [selectedOption, setSelectedOption] = useState(''); // 초기값을 빈 문자열로 설정
  const [options, setOptions] = useState([{ value: '', label: '전체' }]); // 기본 옵션을 '전체'로 설정
  const [results, setResults] = useState([]); // 질문 및 스터디 검색 결과 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [inputValue, setInputValue] = useState(''); // 실제 입력값 상태 추가

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
        setOptions([{ value: '', label: '전체' }, ...categories]); // 빈 값과 카테고리 설정
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 데 실패했습니다:', error);
        setError('카테고리 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // 선택된 카테고리 처리 및 검색 실행
  const handleSelect = (value) => {
    setSelectedOption(value);
    setResults([]); // 새로운 카테고리 선택 시 결과 초기화

    // 카테고리가 선택되면 그에 맞게 검색 수행
    fetchQuestionsAndStudies(value, searchTerm);
  };

  // 검색어가 변경될 때 상태 업데이트 (검색이 실행되지는 않음)
  const handleInputChange = (value) => {
    setInputValue(value); // inputValue 상태만 업데이트
  };

  // 검색 버튼 클릭 또는 엔터키 입력 시 실행
  const handleSearch = () => {
    setSearchTerm(inputValue); // 검색어 상태를 업데이트하여 검색 실행
    fetchQuestionsAndStudies(selectedOption, inputValue);
  };

  // 질문 및 스터디 목록 불러오기 (최신순으로 총 10개만)
  const fetchQuestionsAndStudies = async (category, searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      // 카테고리와 검색어를 필터에 반영
      const filter = [];
      if (category) filter.push(`category='${category}'`); // 선택된 카테고리가 있으면 추가
      if (searchTerm) filter.push(`title~'${searchTerm}'`); // 검색어가 있으면 부분 일치 검색

      const filterQuery = filter.join(' && '); // 필터 쿼리 조합
      const queryOptions = filterQuery
        ? { filter: filterQuery, sort: '-created', perPage: 5, page: 1 }
        : { sort: '-created', perPage: 5, page: 1 }; // 필터가 없으면 최신순으로 5개씩 가져오기

      // 각각 질문과 스터디에서 최대 5개씩 가져오기
      const questions = await pb
        .collection('Question_Posts')
        .getList(1, 5, queryOptions);
      const studies = await pb
        .collection('Study_Posts')
        .getList(1, 5, queryOptions);

      // 결과 병합 및 정렬 (생성 날짜 기준 내림차순)
      const combinedResults = [
        ...questions.items.map((item) => ({ ...item, type: 'question' })), // getList에서는 items 사용
        ...studies.items.map((item) => ({ ...item, type: 'study' })),
      ].sort((a, b) => new Date(b.created) - new Date(a.created));

      // 상위 10개만 설정
      setResults(combinedResults.slice(0, 10));
    } catch (error) {
      console.error('데이터를 가져오는 데 실패했습니다:', error);
      setError('데이터를 가져오는 데 실패했습니다.');
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
            inputColor="bg-white"
            onChange={handleInputChange} // 입력값 변경 시 상태 업데이트 (검색은 아님)
            onClick={handleSearch} // 검색 버튼 클릭 시 검색 실행
            onEnter={handleSearch} // 엔터키 입력 시 검색 실행 (수정된 부분)
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
            <div className="h-[80vh] flex justify-center items-center">
              <FadeLoader color="#79b2d1" />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : results.length > 0 ? (
            <ResultList results={results} />
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}

// 검색 결과 목록 컴포넌트

function ResultList({ results }) {
  return (
    <ul>
      {results.map((result) => (
        <li key={result.id} className="py-2 border-b">
          {/* 글 제목을 클릭하면 해당 글의 상세 페이지로 이동 */}
          <Link
            to={
              result.type === 'question'
                ? `/home/board/qna-detail/${result.id}`
                : `/home/study-detail/${result.id}`
            }
          >
            <h3 className="text-lg font-semibold">
              [{result.type === 'question' ? '질문' : '스터디'}] {result.title}
            </h3>
          </Link>
          <p className="text-sm">{result.content}</p>
        </li>
      ))}
    </ul>
  );
}
