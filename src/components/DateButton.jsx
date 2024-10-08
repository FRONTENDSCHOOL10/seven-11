import { func, string } from 'prop-types';
import { useState } from 'react';

DateButton.propTypes = {
  label: string,
  onChange: func,
};

function DateButton({ label, onChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // 선택된 값을 부모 컴포넌트로 전달
  };

  return (
    <select
      value={selectedValue}
      onChange={handleSelect}
      className="border rounded p-2 appearance-none text-center
                 w-full min-w-[95px] md:min-w-[127px] 
                 h-[38px] md:h-[42px] 
                 text-[15px] "
    >
      <option value="">{label}</option>
      {label === '년' &&
        Array.from({ length: 2024 - 1920 + 1 }, (_, i) => {
          const year = 2024 - i; // 2024년부터 1920년까지 역순으로 설정
          return (
            <option key={year} value={year}>
              {year} 년
            </option>
          );
        })}
      {label === '월' &&
        Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1} 월
          </option>
        ))}
      {label === '일' &&
        Array.from({ length: 31 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1} 일
          </option>
        ))}
    </select>
  );
}

export default DateButton;
