import { LeftIcon } from '@/components';
import StudyForm from '@/components/StudyForm';
import usePostStore from '@/stores/usePostStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function StudyEdit() {
  const { postId } = useParams();
  const { post, setPost } = usePostStore();

  useEffect(() => {
    setPost(postId);
  }, [postId, setPost]);

  return (
    <>
      <div className="pl-3 py-2">
        <LeftIcon />
      </div>
      {post && <StudyForm mode="edit" studyData={post} />}{' '}
    </>
  );
}
