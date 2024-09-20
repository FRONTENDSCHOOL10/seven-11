import { memo, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useCategoryStore from '@/stores/useCategoryStore';
import clsx from 'clsx';
import { Mousewheel } from 'swiper/modules';

function CategoryNav() {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoryStore((s) => ({
      categories: s.categories,
      selectedCategory: s.selectedCategory,
      setSelectedCategory: s.setSelectedCategory,
    }));

  const getTextClass = (id) => {
    return clsx(selectedCategory === id ? 'text-white' : 'text-gray-400');
  };

  // Swiper DOM을 참조하는 ref 생성
  const swiperRef = useRef(null);

  // 레이아웃 효과로 슬라이드 간격 조정
  useLayoutEffect(() => {
    const swiperWrapper = swiperRef.current?.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      swiperWrapper.style.justifyContent = 'space-evenly'; // 슬라이드 사이 균등 간격
    }
  }, []);

  return (
    <div className="w-full h-[37px] bg-primary flex items-center font-semibold px-4">
      <Swiper
        ref={swiperRef} // Swiper 컴포넌트에 ref 적용
        modules={[Mousewheel]} // Mousewheel 모듈 추가
        mousewheel // 마우스 휠 사용 설정
        slidesPerView={4} // 보이는 슬라이드 개수 설정
        className="w-full h-full"
      >
        <SwiperSlide className="flex items-center justify-center whitespace-nowrap">
          <button
            className={`cursor-pointer ${getTextClass(null)}`}
            onClick={() => setSelectedCategory(null)}
          >
            전체
          </button>
        </SwiperSlide>
        {categories.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center justify-center whitespace-nowrap"
          >
            <button
              className={`cursor-pointer ${getTextClass(item.id)}`}
              onClick={() => setSelectedCategory(item.id)}
            >
              {item.category_name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default memo(CategoryNav);
