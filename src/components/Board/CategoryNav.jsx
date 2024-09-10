import { memo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useCategoryStore from '@/stores/useCategoryStore';

function CategoryNav() {
  const { categories, selectedCategory, fetchCategories, setSelectedCategory } =
    useCategoryStore();

  useEffect(() => {
    fetchCategories('i0cg783rtm915js');
  }, [fetchCategories]);

  return (
    <div className="w-full h-[37px] bg-primary flex items-center justify-center font-semibold px-3">
      <Swiper
        spaceBetween={13.5}
        slidesPerView={4}
        className=""
      >
        <SwiperSlide className="flex justify-center items-center text-center whitespace-nowrap w-full">
          <a
            className={`cursor-pointer w-full ${
              selectedCategory === null ? 'text-white' : 'text-gray-400'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            전체
          </a>
        </SwiperSlide>
        {categories.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-center items-center text-center whitespace-nowrap"
          >
            <a
              className={`cursor-pointer ${
                selectedCategory?.id === item.id
                  ? 'text-white'
                  : 'text-gray-400'
              }`}
              onClick={() => setSelectedCategory(item)}
            >
              {item.category_name}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default memo(CategoryNav);
