import { memo } from 'react';
import { Link } from 'react-router-dom';

function EditProfile() {
  return (
    <div>
      <h1>프로필 편집</h1>
      <Link to={'/home/user-info/profile-detail'}>프로필 수정</Link>
    </div>
  );
}

export default memo(EditProfile);
