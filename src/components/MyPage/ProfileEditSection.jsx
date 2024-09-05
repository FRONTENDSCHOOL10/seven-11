import InputText from '../InputText';
import EditButton from './EditButton';
import EditInput from './EditInput';
import EditTitle from './EditTitle';

export default function ProfileEditSection() {
  return (
    <div className="flex flex-col gap-[11px] mb-[13px]">
      <EditTitle>닉네임</EditTitle>
      <div className="flex flex-row justify-center gap-2 w-full max-w-md mx-auto">
        <EditInput />
        <EditButton>중복확인</EditButton>
      </div>
      <EditTitle>직업</EditTitle>
      <InputText placeholder="직업을 입력해주세요." />
      <EditTitle>자격</EditTitle>
      <InputText placeholder="자격증을 입력해주세요. 예) TOEFL 2024" />
    </div>
  );
}
