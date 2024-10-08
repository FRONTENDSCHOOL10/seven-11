import { memo, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';
import { Mousewheel } from 'swiper/modules';
import { arrayOf, func, shape, string } from 'prop-types';

function CategoryNav({ categories, selectedCategory, setSelectedCategory }) {
  const getTextClass = (id) => {
    return clsx(selectedCategory === id ? 'text-white' : 'text-gray-400');
  };

  // Swiper DOM을 참조하는 ref 생성
  const swiperRef = useRef(null);

  // 레이아웃 효과로 슬라이드 간격 조정
  useLayoutEffect(() => {
    const swiperWrapper = swiperRef.current?.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      swiperWrapper.style.justifyContent = 'flex-start'; // 슬라이드 사이 간격을 없애고 자연스럽게 정렬
    }
  }, []);

  return (
    <div className="w-full h-[37px] bg-primary flex items-center font-semibold px-4">
      <Swiper
        ref={swiperRef} // Swiper 컴포넌트에 ref 적용
        modules={[Mousewheel]} // Mousewheel 모듈 추가
        mousewheel // 마우스 휠 사용 설정
        slidesPerView="auto" // 슬라이드 너비를 자동으로 계산
        spaceBetween={35} // 슬라이드 간의 여백을 최소화
        className="w-full h-full"
      >
        <SwiperSlide className="flex items-center justify-center whitespace-nowrap !w-auto">
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
            className="flex items-center justify-center whitespace-nowrap !w-auto"
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

CategoryNav.propTypes = {
  categories: arrayOf(
    shape({
      id: string.isRequired,
      category_name: string.isRequired,
    })
  ).isRequired, // 카테고리 리스트도 prop으로 전달받음
  selectedCategory: string,
  setSelectedCategory: func.isRequired,
};

export default memo(CategoryNav);
