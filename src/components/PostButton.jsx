import { useState } from 'react';
import PostIcon from './PostIcon';
import PostMenuModal from './PostMenuModal';

function PostButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="relative w-20 h-10 left-[260px] bottom-20">
      <PostIcon onClick={handleClick} isClicked={isClicked} />
      {isClicked && <PostMenuModal />}
    </div>
  );
}

export default PostButton;
