import { memo } from 'react';
import clsx from 'clsx';
import { bool, string, func } from 'prop-types';
import { Link } from 'react-router-dom';

SelectAgreement.propTypes = {
  isShowDetail: bool,
  children: string.isRequired,
  isShowDisc: bool,
  checked: bool.isRequired,
  onChange: func.isRequired,
};

function SelectAgreement({
  isShowDisc,
  children,
  isShowDetail,
  checked,
  onChange,
}) {
  const discriptionClass = clsx(isShowDisc ? '' : 'hidden');
  const detailClass = clsx(!isShowDetail && 'hidden');
  return (
    <div className="flex flex-col gap-[9px] justify-center mt-3">
      <div className="flex gap-3">
        <label htmlFor="needy" className="flex items-center gap-3">
          <input
            type="checkbox"
            name="필수 동의"
            id="needy"
            className="w-4 h-4 flex-none"
            checked={checked}
            onChange={onChange}
          />
          <span className="text-sm font-semibold">[ 필수 ] {children}</span>
        </label>
        <div
          className={`flex items-center gap-[-4px] text-sm text-gray-300 ${detailClass}`}
        >
          <Link>자세히</Link>
          <svg className="w-4 h-4 text-gray-300">
            <use href="/stack.svg#right" />
          </svg>
        </div>
      </div>
      <div className={`pl-7 leading-4 ${discriptionClass}`}>
        <p className="text-sm text-gray-600 inline">
          입력한 닉네임, 프로필 사진, 성별, 연령, 자격은 작심하루 서비스 내
          프로필 페이지, 답변자 정보 영역, 작심하루 홈 및 서비스 내 프로필
          공개를 목적으로 합니다.
        </p>
        <p className="text-sm text-secondary inline font-semibold">
          수집된 정보는 언제든지 직접 삭제할 수 있고, 탈퇴 시에는 바로
          파기됩니다.
        </p>
      </div>
    </div>
  );
}

export default memo(SelectAgreement);
