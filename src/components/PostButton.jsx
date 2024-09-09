import { useState } from 'react';
import PostIcon from './PostIcon';
import PostMenuModal from './PostMenuModal';

function PostButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="absolute right-2.5 bottom-20">
      <PostIcon onClick={handleClick} isClicked={isClicked} />
      {isClicked && <PostMenuModal />}
    </div>
  );
}

export default PostButton;
