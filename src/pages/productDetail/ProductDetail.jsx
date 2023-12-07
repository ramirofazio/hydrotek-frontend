import { ProductDescription } from "./index";
import { useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip } from "swiper/modules";
import "swiper/css/effect-flip";
import "swiper/css";
import { logos } from "src/assets";
import { useEffect } from "react";

export default function ProductDetail() {
  //const { t } = useTranslation();
  const product = useLoaderData();
  const { id, name, arsPrice, description, images } = product;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="content  mx-auto my-5 grid w-[92%] gap-8 lg:grid-cols-2  lg:place-items-center">
      <picture className="flex h-full min-h-[150px] w-full min-w-[150px] items-center justify-center bg-productBorderGradient  bg-contain bg-clip-content bg-center bg-no-repeat lg:max-w-xl">
        <Swiper
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          flipEffect={{ slideShadows: false }}
          modules={[Autoplay, EffectFlip]}
          effect="flip"
        >
          {images.length ? (
            images.map(({ path }, i) => (
              <SwiperSlide key={i}>
                <img src={path} alt="foto del producto" className="mx-auto w-[50%] md:w-[30%] lg:w-[60%]" />
              </SwiperSlide>
            ))
          ) : (
            <img src={logos.hydBlack} alt="foto del producto" className="mx-auto w-[50%] md:w-[30%] lg:w-[60%]" />
          )}
        </Swiper>
      </picture>
      <ProductDescription productId={id} price={arsPrice} name={name} description={description} key={id} img={images} />
      {/*
    // ? Comentado hasta saber si van a o no reseñas
    <section className="border-t-[1px] border-gold py-5  md:col-span-2">
        <h1 className="mx-auto mb-4 w-fit">{t("common.reviews")}</h1>
        <div className="grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
      </section> */}
    </main>
  );
}
