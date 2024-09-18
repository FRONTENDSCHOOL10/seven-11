import StudyMap from '@/components/Map/StudyMap';
import { Suspense } from 'react';

export function Component() {
  return (
    <div>
      <Suspense fallback={<div>로딩중...</div>}></Suspense>
      <StudyMap />
    </div>
  );
}
