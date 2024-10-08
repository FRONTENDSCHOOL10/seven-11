import { Link } from 'react-router-dom';
import S from './ChatNotice.module.css';
import { string } from 'prop-types';

ChatNotice.propTypes = {
  notice: string,
  linkTo: string,
};

function ChatNotice({ notice, linkTo }) {
  return (
    <div className={S.component}>
      <div className={S.container}>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-1">
            <svg className="w-[18px] h-[18px]">
              <use href="/stack.svg#calendar" />
            </svg>
            <span className="text-white text-[14px] font-normal">{notice}</span>
          </div>
          <div className="text-[7px] text-white w-full">
            * 개인정보 유도와 명예훼손 내용은 차단될 수 있어요.{' '}
            <span className="underline">자세히 보기</span>
          </div>
        </div>
        <Link
          to={linkTo}
          type="button"
          className="flex flex-col gap-[5px] items-center"
        >
          <svg className="w-4 h-4">
            <use href="/stack.svg#shortcut" />
          </svg>
          <div className="text-[4px] text-white">본문글 보기</div>
        </Link>
      </div>
    </div>
  );
}

export default ChatNotice;
