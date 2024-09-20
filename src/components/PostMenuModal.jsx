import { memo } from 'react';
import { Link } from 'react-router-dom';

function PostMenuModal() {
  return (
    <div className="absolute bottom-14 right-0 text-base  ">
      <ul>
        <li className="mb-1">
          <Link to={'/home/qna-post'}>
            <button className="flex items-center justify-center gap-1 px-5 py-2.5  bg-primary rounded-xl w-[107px] whitespace-nowrap">
              <span>🤔</span> 질문하기
            </button>
          </Link>
        </li>
        <li>
          <Link to={'/home/study-post'}>
            <button className="flex items-center justify-center gap-1 px-5 py-2.5 bg-primary rounded-xl w-[107px] whitespace-nowrap">
              <span>🙋‍♀️</span> 모집하기
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(PostMenuModal);
