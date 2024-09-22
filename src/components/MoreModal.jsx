import { bool, func } from 'prop-types';
import useAuthorStore from '../stores/useAuthorStore';
import { getStorageData } from '@/utils/storageData';
import usePostStore from '@/stores/usePostStore';
import pb from '@/api/pb';
import { useNavigate, useLocation } from 'react-router-dom';

function MoreModal({ isVisible }) {
  const isAuthor = useAuthorStore((s) => s.isAuthor);
  const authInfo = getStorageData('authInfo');
  const loggedInUserId = authInfo?.user?.id;
  const post = usePostStore((s) => s.post);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isVisible) return null;

  const isUserAuthor = isAuthor(loggedInUserId);

  const isStudyPost = location.pathname.startsWith('/home/study-detail');
  const postId = isStudyPost ? location.pathname.split('/').pop() : post.id;

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        if (isStudyPost) {
          await pb.collection('Study_Posts').delete(postId);
          navigate('/home');
        } else {
          await pb.collection('Question_Posts').delete(postId);
          navigate('/home/board');
        }
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const handleEdit = () => {
    if (isStudyPost) {
      navigate(`/home/study-edit/${postId}`);
    } else {
      navigate(`/home/qna-edit/${postId}`);
    }
  };

  return (
    <div className="absolute top-full right-0 flex items-end justify-end">
      <div className="w-[113px] flex flex-col bg-white rounded-es border-l border-b border-gray-100 shadow-md">
        {isUserAuthor ? (
          <>
            <button
              className="flex items-center justify-center w-full h-[56px] text-base border-b border-gray-100"
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              className="flex items-center justify-center w-full h-[56px] text-base"
              onClick={handleDelete}
            >
              삭제
            </button>
          </>
        ) : (
          <button
            className="flex items-center justify-center w-full h-[56px] text-base"
            onClick={() => alert('신고')}
          >
            신고
          </button>
        )}
      </div>
    </div>
  );
}

MoreModal.propTypes = {
  isVisible: bool.isRequired,
  onClose: func.isRequired,
};

export default MoreModal;
