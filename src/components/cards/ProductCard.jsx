import Atropos from "atropos/react";
import { logos } from "assets/index";
import { Button } from "components/buttons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { backgrounds } from "src/assets";
import { AddToCart } from "src/pages/shoppingCart/AddToCart";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip } from "swiper/modules";
import "swiper/css/effect-flip";
import "swiper/css";

export function ProductCard({ images, name, price, id, showBtn = true }) {
  const { t } = useTranslation();

  return (
    <div className={`grid h-full w-fit p-4 md:w-[100%] xl:p-0`}>
      <Link to={`/productDetail/${id}`}>
        <Atropos highlight={false} activeOffset={200} shadow={false} className="h-full w-full cursor-pointer xl:pb-4">
          <div className="relative mx-auto grid aspect-square !h-[250px] place-content-center place-items-center  p-6">
            <img src={backgrounds.productBorderGradient} className="absolute" data-atropos-offset={-5} />
            <Swiper
              loop={true}
              autoplay={{
                delay: Math.random() * (3500 - 2500) + 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              flipEffect={{ slideShadows: false }}
              modules={[Autoplay, EffectFlip]}
              effect="flip"
              className="absolute w-[50%]"
            >
              {images?.length ? (
                images.map(({ path }, i) => (
                  <SwiperSlide key={i}>
                    <img src={path} alt="foto del producto" className="mx-auto" />
                  </SwiperSlide>
                ))
              ) : (
                <>
                  <SwiperSlide>
                    <img src={logos.hydBlack} alt="foto del producto" className="mx-auto" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={logos.hydPurple} alt="foto del producto" className="mx-auto" />
                  </SwiperSlide>
                </>
              )}
            </Swiper>
          </div>
        </Atropos>
      </Link>
      <div className={`${!showBtn && "hidden"} mx-auto grid place-items-center gap-2 pb-12 text-center`}>
        <h1 className="text-center text-sm md:place-self-start">{name || "NOMBRE DEL PRODUCTO"}</h1>
        <h2 className="textGoldGradient mb-4 md:mb-2 md:place-self-start">
          {price?.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </h2>
        {showBtn && (
          <div className="flex  items-center gap-3 md:gap-8 md:place-self-center s:gap-5">
            <Link to={`/productDetail/${id}`} className="md:place-self-start">
              <Button text={t("common.see")} pClassname={"font-primary"} />
            </Link>
            <AddToCart productImg={images[0]?.path || logos.hydBlack} productName={name} price={price} productId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
