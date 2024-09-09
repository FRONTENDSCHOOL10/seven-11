import { func } from 'prop-types';
import { memo } from 'react';

PostIcon.propTypes = {
  onClick: func.isRequired,
  isClicked: func.isRequired,
};

function PostIcon({ onClick, isClicked }) {
  return (
    <button type="button" onClick={onClick} aria-label="글 올리기 메뉴 보기">
      <svg className="w-12 h-12">
        <use
          href={`/stack.svg#${isClicked ? 'postButtonClicked' : 'postButton'}`}
        />
      </svg>
    </button>
  );
}

export default memo(PostIcon);
