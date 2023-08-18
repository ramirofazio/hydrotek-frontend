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
        className="h-[70%] w-full px-28 "
      >
        <SwiperSlide className="swiperSlide">
          {/* <img src={img} className="aspect-square w-48" /> */}
          <ProductCard imgUrl={img} />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          {/* <img src={img} className="aspect-square w-48" /> */}
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          {/* <img src={img} className="aspect-square w-48" /> */}
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          {/* <img src={img} className="aspect-square w-48" /> */}
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          {/* <img src={img} className="aspect-square w-48" /> */}
          <ProductCard />
        </SwiperSlide>
        <SwiperSlide className="swiperSlide">
          {/* <img src={img} className="aspect-square w-48" /> */}
          <ProductCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
