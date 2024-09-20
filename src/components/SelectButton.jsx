import { useState } from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Mousewheel } from 'swiper/modules';

SelectButton.propTypes = {
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  onSelect: func.isRequired,
};

export default function SelectButton({ options, onSelect }) {
  const [selected, setSelected] = useState(options[0].value);

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <div className="w-full h-[45px] bg-white flex items-center">
      <Swiper
        spaceBetween={8} // 간격을 줄여서 더 타이트하게
        slidesPerView="auto" // 슬라이드 크기를 자동으로 맞춤
        modules={[Mousewheel]}
        mousewheel
        className="w-full"
      >
        {options.map(({ value, label }) => (
          <SwiperSlide key={value} className="!w-auto">
            <button
              className={`px-3 py-2 rounded-full text-sm border box-border whitespace-nowrap ${
                selected === value
                  ? 'bg-primary border-primary text-white'
                  : 'bg-transparent border-gray-400 text-black'
              }`}
              onClick={() => handleSelect(value)}
            >
              {label}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
