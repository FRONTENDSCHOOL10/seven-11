import React, { useState } from 'react';
import PropTypes from 'prop-types';

GenderRadio.propTypes = {
  onChange: PropTypes.func, // 부모 컴포넌트에서 호출될 onChange 함수
};

function GenderRadio({ onChange }) {
  const [selectedGenders, setSelectedGenders] = useState([]); // 성별을 배열로 관리

  const genders = [
    { label: '남성', value: '남성' },
    { label: '여성', value: '여성' },
  ];

  const handleGenderChange = (gender) => {
    // 배열에 선택된 성별 추가 (라디오 버튼이므로 배열에 하나의 값만 유지)
    setSelectedGenders([gender.value]);

    // 부모 컴포넌트로 배열 전달
    if (onChange) {
      onChange([gender.value]); // 성별 배열 전달
    }
  };

  return (
    <div className="flex w-[295px]">
      {genders.map((gender) => (
        <div key={gender.value} className="flex items-center pr-3">
          <label htmlFor={gender.value} className="mr-3 text-base">
            {gender.label}
          </label>
          <input
            id={gender.value}
            type="radio"
            name="gender"
            value={gender.value}
            checked={selectedGenders.includes(gender.value)} // 배열에 해당 성별이 있는지 확인
            onChange={() => handleGenderChange(gender)} // 선택된 성별 배열로 관리
            className="w-5 h-5"
          />
        </div>
      ))}
    </div>
  );
}

export default GenderRadio;
