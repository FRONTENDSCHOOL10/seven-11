import { func } from 'prop-types';
import { memo, useState } from 'react';

PostIcon.propTypes = {
  onClick: func,
};

function PostIcon({ onClick }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsClicked((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="글 올리기 메뉴 보기"
    >
      <svg className="w-12 h-12">
        <use
          href={`/stack.svg#${isClicked ? 'postButtonClicked' : 'postButton'}`}
        />
      </svg>
    </button>
  );
}

export default memo(PostIcon);
