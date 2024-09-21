import React, { useState, useEffect } from 'react';
import LeftIcon from '@/components/LeftIcon';
import SearchBar from '@/components/SearchBar';
import SelectButton from '@/components/SelectButton';
import { Helmet } from 'react-helmet-async';
import { SubTitle } from '@/components';
import pb from '@/api/pb'; // PocketBase 인스턴스 임포트

export default function Search() {
  // 상태 관리
  const [selectedOption, setSelectedOption] = useState('전체'); // 선택된 카테고리
  const [options, setOptions] = useState([{ value: '전체', label: '전체' }]); // 초기 옵션 설정
  const [questions, setQuestions] = useState([]); // 불러온 질문 데이터를 저장하는 상태

  // PocketBase에서 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const records = await pb.collection('Categories').getFullList();
        const categories = records.map((category) => ({
          value: category.id, // 카테고리 id를 value로 사용
          label: category.category_name, // 카테고리 이름을 label로 사용
        }));
        setOptions([{ value: '전체', label: '전체' }, ...categories]); // "전체" 옵션 추가
      } catch (error) {
        console.error('카테고리 데이터를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchCategories();
  }, []);

  // 선택된 카테고리에 따라 Question_Posts 데이터를 가져오기
  const fetchQuestions = async (category) => {
    try {
      const filter = category === '전체' ? '' : `category_id="${category}"`;
      const records = await pb.collection('Question_Posts').getFullList({
        filter: filter, // 카테고리 ID로 필터링
      });
      setQuestions(records);
    } catch (error) {
      console.error('질문 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  // 옵션 선택 시 호출되는 핸들러
  const handleSelect = (value) => {
    setSelectedOption(value);
    console.log('선택된 옵션:', value);
    fetchQuestions(value); // 카테고리 선택 시 질문 데이터 가져오기
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

        {/* SelectButton 컴포넌트 추가 */}
        <div className="mt-4">
          <SelectButton options={options} onSelect={handleSelect} />
        </div>

        {/* 선택된 카테고리에 따른 질문 게시글 표시 */}
        <div className="mt-6">
          {questions.length > 0 ? (
            <ul>
              {questions.map((question) => (
                <li key={question.id} className="py-2 border-b">
                  <h3 className="text-lg font-semibold">{question.title}</h3>
                  <p className="text-sm">{question.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}
