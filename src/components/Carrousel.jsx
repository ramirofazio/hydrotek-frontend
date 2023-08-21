import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import img from "../assets/blackLogo.png";
import ProductCard from "./ProductCard";

export default function SwiperComponent() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <>
      <Swiper
        loop={true}
        pagination={pagination}
        slidesPerView={3}
        spaceBetween={70}
        modules={[Pagination]}
        className="h-screen w-full px-28"
      >
        <SwiperSlide className="swiperSlide">
          <ProductCard imgUrl={img} />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          <ProductCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
