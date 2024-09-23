import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import pb from '@/api/pb';
import { Helmet } from 'react-helmet-async';
import {
  Agreement,
  ProfileButton,
  ProfileEditSection,
  ProfileHeader,
  ProfileImg,
} from '@/components/MyPage';
import useProfileStore from '@/stores/useProfileStore';
import { getStorageData } from '@/utils';
import useAgreementStore from '@/stores/useAgreementStore';
import { toast, Toaster } from 'react-hot-toast';

function ProfileDetail() {
  const { user, fetchUserData } = useProfileStore((s) => ({
    user: s.user,
    fetchUserData: s.fetchUserData,
  }));

  const { job, license, nickname } = useProfileStore((s) => ({
    license: s.license,
    job: s.job,
    nickname: s.nickname,
  }));

  const { allChecked } = useAgreementStore((s) => ({
    allChecked: s.allChecked,
  }));

  const [form] = useState(getStorageData('authInfo').user);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [, setInputData] = useState({ job, license, nickname });
  const navigate = useNavigate();

  const fetchOnce = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(fetchOnce, [fetchOnce]);

  const handleSelectFile = (image) => {
    setImageFile(image);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = async () => {
    const isInputEmpty =
      job === null && nickname === null && license === null ? true : false;

    const isSomeEmpty =
      job === null || nickname === null || license === null ? true : false;

    if (isInputEmpty && !imageFile) {
      toast.error('변경사항이 없어요!');
      return;
    }

    const formData = {
      job: form.job,
      nickname: form.nickname,
      license: form.nickname,
    };
    if (imageFile) formData.avatar = imageFile;
    if (job && job !== form.job) formData.job = job;
    if (license && license !== form.license) formData.license = license;
    if (nickname && nickname !== form.nickname) formData.nickname = nickname;

    const userId = form.id;

    try {
      if (isSomeEmpty || !imageFile) {
        confirm('모두 입력하지 않았어요. 이대로 진행하시겠어요?');
        await pb.collection('users').update(userId, formData);
        console.log(formData);

        return;
      }
      await pb.collection('users').update(userId, formData);
      toast.success('프로필이 성공적으로 수정되었습니다!');
    } catch (err) {
      console.error(`formData update 에러: ${err}`);
      toast.error('프로필 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleInputChange = (field, value) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet>
        <title>작심하루 - 프로필 수정</title>
        <meta
          name="description"
          content="작심하루에 등록한 나의 프로필을 수정하고 저장할 수 있습니다."
        />
      </Helmet>
      <div>
        <Toaster />
        <ProfileHeader to={'/home/user-info/profile-edit'}>
          기본정보
        </ProfileHeader>
        <div className="flex flex-col items-center mt-4">
          <ProfileImg
            userImg={
              previewImage ||
              (user.avatar
                ? pb.files.getUrl(user, user.avatar)
                : '/favicon.svg')
            }
            width={73}
            height={73}
            isHiddenSVG={false}
            onClick={handleSelectFile}
          />
        </div>
        <div className="px-3">
          <ProfileEditSection user={user} onInputChange={handleInputChange} />
        </div>
        <Agreement />
        <div className="flex gap-2 justify-between px-3 mt-[20px] mb-[18px]">
          <ProfileButton onClick={handleCancel}>취소</ProfileButton>
          <ProfileButton onClick={handleSubmit} disabled={!allChecked}>
            저장
          </ProfileButton>
        </div>
        <span className="text-sm text-gray-300 flex justify-center mb-[34px]">
          정보 초기화 및 이용 동의 철회
        </span>
      </div>
    </>
  );
}

export default memo(ProfileDetail);
