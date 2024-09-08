import { memo } from 'react';

function MenuButton() {
  return (
    <div className="absolute bottom-[80px] right-0 bg-white p-3 rounded-lg shadow-lg">
      <ul>
        <li className="mb-2">
          <button className="flex items-center gap-2 p-2 bg-blue-200 rounded-lg w-[120px]">
            <span>🤔</span> 질문하기
          </button>
        </li>
        <li>
          <button className="flex items-center gap-2 p-2 bg-blue-200 rounded-lg w-[120px]">
            <span>🙋‍♀️</span> 모집하기
          </button>
        </li>
      </ul>
    </div>
  );
}

export default memo(MenuButton);
