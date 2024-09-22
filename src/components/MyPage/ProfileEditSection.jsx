import { memo, useRef } from 'react'; // useRef 추가
import { EditTitle, EditInput, EditButton } from './index';
import { InputText } from '../index';
import { object } from 'prop-types';
import useProfileStore from '@/stores/useProfileStore';
import pb from '@/api/pb';
import toast from 'react-hot-toast';

ProfileEditSection.propTypes = {
  user: object,
};

function ProfileEditSection({ user }) {
  const { nickname, setJob, setLicense, setNickname } = useProfileStore(
    (s) => ({
      job: s.job,
      license: s.license,
      nickname: s.nickname,
      setJob: s.setJob,
      setLicense: s.setLicense,
      setNickname: s.setNickname,
    })
  );

  const nicknameInputRef = useRef(null); // 닉네임 인풋에 접근하기 위한 ref

  const handleJob = (job) => {
    setJob(job);
  };

  const handleLicense = (license) => {
    setLicense(license);
  };

  const handleNickname = (nickname) => {
    setNickname(nickname);
  };

  const handleSameNickname = async () => {
    try {
      await pb.collection('users').getFirstListItem(`nickname="${nickname}"`);
      toast.error('중복된 닉네임이 존재합니다.');
      setNickname('');
      if (nicknameInputRef.current) {
        nicknameInputRef.current.value = '';
        nicknameInputRef.current.focus();
      }
    } catch (err) {
      toast.success('사용 가능한 닉네임입니다.');
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-[11px] mb-[13px]">
      <EditTitle>닉네임</EditTitle>
      <div className="flex flex-row justify-between gap-3 w-full max-w-md mx-auto">
        <EditInput
          inputRef={nicknameInputRef} // 인풋 엘리먼트에 ref를 전달
          onChange={handleNickname}
          placeholder={user?.nickname || '닉네임을 입력하세요'}
        />
        <EditButton onClick={handleSameNickname}>중복확인</EditButton>
      </div>
      <EditTitle>직업</EditTitle>
      <InputText onChange={handleJob} placeholder="직업을 입력해주세요." />
      <EditTitle>자격</EditTitle>
      <InputText
        onChange={handleLicense}
        placeholder="자격증을 입력해주세요. 예) TOEFL 2024"
      />
    </div>
  );
}

export default memo(ProfileEditSection);
