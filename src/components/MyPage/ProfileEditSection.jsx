import { memo } from 'react';
import { EditTitle, EditInput, EditButton } from './index';
import { InputText } from '../index';
import { object } from 'prop-types';

ProfileEditSection.propTypes = {
  user: object,
};

function ProfileEditSection({ user }) {
  return (
    <div className="flex flex-col gap-[11px] mb-[13px]">
      <EditTitle>닉네임</EditTitle>
      <div className="flex flex-row justify-between gap-3 w-full max-w-md mx-auto">
        <EditInput placeholder={user?.nickname || '닉네임을 입력하세요'} />
        <EditButton>중복확인</EditButton>
      </div>
      <EditTitle>직업</EditTitle>
      <InputText placeholder="직업을 입력해주세요." />
      <EditTitle>자격</EditTitle>
      <InputText placeholder="자격증을 입력해주세요. 예) TOEFL 2024" />
    </div>
  );
}

export default memo(ProfileEditSection);
