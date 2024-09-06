import { number } from 'prop-types';
import { memo } from 'react';

Temperature.propTypes = {
  temp: number.isRequired,
};

function Temperature({ temp }) {
  if (temp < 36.5) {
    temp = 36.5;
  }

  return (
    <div className="px-4">
      <div className="flex gap-1 items-center translate-y-[12px]">
        <span className="text-[12px]">열정온도</span>
        <svg className={`w-[14px] h-[14px] `}>
          <use href={`/stack.svg#information`} />
        </svg>
      </div>
      <div className={`flex justify-between text-sm text-gray-300 mb-2 `}>
        <div className="translate-x-[70px] flex flex-col items-center translate-y-[8px]">
          <span className="">첫 온도 36.5°C</span>
          <div>▼</div>
        </div>
        <span className="text-secondary font-bold text-base translate-y-[18px]">
          {temp}°C 😊
        </span>
      </div>
      <div className="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 bg-secondary `}
          style={{ width: `${temp}%` }}
        ></div>
      </div>
    </div>
  );
}

export default memo(Temperature);
