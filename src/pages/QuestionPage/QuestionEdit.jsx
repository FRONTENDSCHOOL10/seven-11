import { LeftIcon } from '@/components';
import QuestionForm from '@/components/Board/QuestionForm';
import usePostStore from '@/stores/usePostStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function QuestionEdit() {
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
      <QuestionForm mode="edit" note={post} />
    </>
  );
}
