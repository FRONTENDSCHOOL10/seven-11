import Badge from '@/components/Badge';
import QuestionList from '@/components/QuestionList';
import { Suspense } from 'react';

export function Component() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>Q&A 게시판</h1>
      <Badge label="피그마" />
      <QuestionList
        tag="일본어"
        title="깊은 복사 얕은..."
        description="제가 이해한... "
        timeAgo="15분 전"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyXeKDN29AmZgZPLS7n0Bepe8QmVappBwZCeA3XWEbWNdiDFB"
      />
      <QuestionList
        tag="자바스크립트"
        title="깊은 복사 얕은 복사의 차이를 ..."
        description="제가 이해한 내용은 얕은 복사는..."
        timeAgo="15분 전"
      />
    </Suspense>
  );
}
