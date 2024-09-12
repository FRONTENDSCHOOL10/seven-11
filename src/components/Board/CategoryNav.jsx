import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useCategoryStore from '@/stores/useCategoryStore';
import clsx from 'clsx';

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

  return (
    <div className="w-full h-[37px] bg-primary flex items-center justify-center font-semibold px-3">
      <Swiper spaceBetween={13.5} slidesPerView={4} className="">
        <SwiperSlide className="flex justify-center items-center text-center whitespace-nowrap w-full">
          <button
            className={`cursor-pointer w-full ${getTextClass(null)}`}
            onClick={() => setSelectedCategory(null)}
          >
            전체
          </button>
        </SwiperSlide>
        {categories.map((item) => (
          <SwiperSlide
            key={item.id}
            className="flex justify-center items-center text-center whitespace-nowrap"
          >
            <button
              className={`cursor-pointer w-full ${getTextClass(item.id)}`}
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
