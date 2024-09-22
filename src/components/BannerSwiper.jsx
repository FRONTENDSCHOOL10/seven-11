import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/autoplay';

import Banner1 from '/assets/Banner1.svg';
import Banner2 from '/assets/Banner2.svg';
import Banner3 from '/assets/Banner3.svg';
import Banner4 from '/assets/Banner4.svg';

export default function BannerSwiper() {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        <SwiperSlide>
          <img src={Banner1} className="w-full" alt="배너 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner2} className="w-full" alt="배너 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner3} className="w-full" alt="배너 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Banner4} className="w-full" alt="배너 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
