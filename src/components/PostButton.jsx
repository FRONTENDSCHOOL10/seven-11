import { useState } from 'react';
import PostIcon from './PostIcon';
import PostMenuModal from './PostMenuModal';

function PostButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="absolute w-12 h-12 right-[10px] bottom-[70px] ">
      <PostIcon onClick={handleClick} isClicked={isClicked} />
      {isClicked && <PostMenuModal />}
    </div>
  );
}

export default PostButton;
