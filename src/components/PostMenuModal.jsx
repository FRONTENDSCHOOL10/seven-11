import { memo } from 'react';

function PostMenuModal() {
  return (
    <div className="absolute bottom-[60px] right-0 text-base  ">
      <ul>
        <li className="mb-1">
          <button className="flex items-center justify-center gap-1 px-5 py-2.5 bg-primary rounded-xl w-[107px]">
            <span>🤔</span> 질문하기
          </button>
        </li>
        <li>
          <button className="flex items-center justify-center gap-1 px-5 py-2.5 bg-primary rounded-xl w-[107px]">
            <span>🙋‍♀️</span> 모집하기
          </button>
        </li>
      </ul>
    </div>
  );
}

export default memo(PostMenuModal);
