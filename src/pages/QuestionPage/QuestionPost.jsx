import { LeftIcon } from '@/components';
import QuestionForm from '@/components/Board/QuestionForm';

export default function QuestionPost() {
  return (
    <>
      <div className="pl-3 py-2">
        <LeftIcon />
      </div>
      <QuestionForm mode="create" />
    </>
  );
}
