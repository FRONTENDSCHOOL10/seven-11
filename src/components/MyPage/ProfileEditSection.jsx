import { getStorageData } from '@/utils';
import { memo } from 'react';
import { EditTitle, EditInput, EditButton } from './index';
import { InputText } from '../index';

function ProfileEditSection() {
  const user = getStorageData('authInfo').user;

  return (
    <div className="flex flex-col gap-[11px] mb-[13px]">
      <EditTitle>닉네임</EditTitle>
      <div className="flex flex-row justify-center gap-2 w-full max-w-md mx-auto">
        <EditInput placeholder={user.nickname} />
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
