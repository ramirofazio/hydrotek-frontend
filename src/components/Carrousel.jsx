import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import img from "../assets/blackLogo.png";

const SwiperComponent = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <>
      <Swiper pagination={pagination} slidesPerView={3} modules={[Pagination]} className="h-[50%] w-full ">
        <SwiperSlide className="swiperSlide">
          <img src={img} className="aspect-square w-48" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src={img} className="aspect-square w-48" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src={img} className="aspect-square w-48" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src={img} className="aspect-square w-48" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src={img} className="aspect-square w-48" />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <img src={img} className="aspect-square w-48" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwiperComponent;
