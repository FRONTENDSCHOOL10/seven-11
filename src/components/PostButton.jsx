import { useState } from 'react';
import PostIcon from './PostIcon';
import PostMenu from './PostMenu';

function PostButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="absolute right-2.5 bottom-20 ">
      <PostIcon onClick={handleClick} />
      {isClicked && <PostMenu />}
    </div>
  );
}

export default PostButton;
