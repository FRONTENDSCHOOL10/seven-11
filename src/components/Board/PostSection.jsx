import { memo } from 'react';
import PostImgButton from './PostImgButton';

function PostSection() {
  return (
    <>
      <fieldset className="">
        <textarea
          className="w-full h-[407px] px-3 py-2 resize-none placeholder-gray-400 text-base outline-none focus-visible:outline"
          placeholder="내용을 입력해주세요."
        />
      </fieldset>
      <fieldset className='px-3'>
        <PostImgButton />
      </fieldset>
    </>
  );
}

export default memo(PostSection);
