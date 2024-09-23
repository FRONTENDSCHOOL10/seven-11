import clsx from 'clsx';
import { bool, func, number, string } from 'prop-types';
import { memo } from 'react';

ProfileImg.propTypes = {
  width: number,
  height: number,
  userImg: string.isRequired,
  userName: string,
  isHiddenSVG: bool.isRequired,
  onClick: func,
};

function ProfileImg({
  width,
  height,
  userImg,
  userName,
  isHiddenSVG,
  onClick,
}) {
  const svg = clsx(isHiddenSVG ? 'hidden' : '');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      onClick(file); // 파일 선택 시 상위 컴포넌트로 전달
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="file"
        className={`absolute top-6 w-[${width}px] h-[${height}px] opacity-0`}
        onChange={handleFile}
      />
      <img
        src={userImg}
        width={width}
        height={height}
        className="rounded-full shadow-profile"
        alt={`${userName} 프로필`}
      />
      <button
        type="button"
        className={`${svg} rounded-full absolute bottom-0 right-0 bg-white shadow-pencil`}
        aria-label="프로필 이미지 수정"
        title="프로필 이미지 수정"
      >
        <svg
          className={`${svg} w-5 h-5 rounded-full absolute bottom-0 right-0 bg-white shadow-pencil`}
        >
          <use href="/stack.svg#pencil" />
        </svg>
      </button>
    </div>
  );
}

export default memo(ProfileImg);
