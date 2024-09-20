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
    <div className="w-80 h-[37px] bg-primary flex items-center font-semibold px-4">
      <Swiper
        spaceBetween={25}
        slidesPerView={4}
        className="w-full h-full overflow-auto"
      >
        <SwiperSlide className=" flex items-center justify-center whitespace-nowrap w-fit">
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
            className="flex items-center justify-center whitespace-nowrap w-fit  "
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
