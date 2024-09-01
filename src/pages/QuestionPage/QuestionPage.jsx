import { Suspense } from 'react';

export function Component() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>Q&A 게시판</h1>
    </Suspense>
  );
}
