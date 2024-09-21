import { number, func } from 'prop-types';
import { useState, useEffect } from 'react';

function Counter({ min = 2, max = 8, value, onChange }) {
  const [count, setCount] = useState(value || min);

  useEffect(() => {
    if (value !== undefined) {
      setCount(value);
    }
  }, [value]);

  const handleIncrement = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  const handleDecrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange(newCount);
    }
  };

  return (
    <div className="w-[85px] h-[22px] flex items-center justify-between ">
      <button
        className="flex items-center justify-center w-6 h-6"
        onClick={handleDecrement}
        disabled={count <= min}
        aria-label="인원수 줄이기"
      >
        <svg className="w-4 h-4">
          <use href="/stack.svg#minus" />
        </svg>
      </button>
      <span className="text-base font-normal ">{count}명</span>
      <button
        className="flex items-center justify-center w-6 h-6"
        onClick={handleIncrement}
        disabled={count >= max}
        aria-label="인원수 늘리기"
      >
        <svg className="w-4 h-4">
          <use href="/stack.svg#plusCounter" />
        </svg>
      </button>
    </div>
  );
}

Counter.propTypes = {
  min: number,
  max: number,
  value: number,
  onChange: func.isRequired,
};

export default Counter;
