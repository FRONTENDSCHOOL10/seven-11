import StudyMap from '@/components/Map/StudyMap';
import { Suspense } from 'react';
import { FadeLoader } from 'react-spinners';

export function Component() {
  return (
    <div className="relative">
      <Suspense
        fallback={
          <div className="h-[80vh] flex justify-center items-center">
            <FadeLoader color="#79b2d1" />
          </div>
        }
      ></Suspense>
      <StudyMap />
    </div>
  );
}
