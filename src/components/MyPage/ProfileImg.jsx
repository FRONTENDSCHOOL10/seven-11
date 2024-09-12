import clsx from 'clsx';
import { bool, func, number, string } from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <Link className={`relative inline-block`}>
      <img
        src={userImg}
        width={width}
        height={height}
        className="rounded-full shadow-profile"
        alt={`${userName} 프로필`}
        onClick={onClick}
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
    </Link>
  );
}

export default memo(ProfileImg);
