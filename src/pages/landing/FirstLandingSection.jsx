import { Image } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { backgrounds } from "src/assets";
import { Button } from "src/components/buttons";
import { Text } from "src/components/text/Text";
import { Autoplay, EffectFlip } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

const FirstLandingSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative flex flex-col items-center justify-between gap-10 py-10 sm:py-20 lg:flex-row lg:items-stretch lg:pt-10 s:gap-16">
      <div className="flex flex-1 flex-col  lg:gap-20 lg:py-10">
        <Text
          Tag="h1"
          content={t("landing.action-1")}
          className={
            "z-10 text-center text-3xl leading-[40px]  sm:!text-5xl sm:!leading-[60px] lg:text-left xl:!text-6xl xl:!leading-[70px] s:text-4xl"
          }
        />
        <Button
          text={t("common.see-products")}
          pClassname={"text-[16px] py-2"}
          className={"z-10 hidden w-full max-w-[500px] lg:block"}
        ></Button>
        <div className="absolute -left-40 top-0 hidden rotate-180 md:block lg:top-auto">
          <Image placeholder="blur" src={backgrounds.goldCircuit} className="blur-md" />
        </div>
      </div>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        effect="flip"
        centeredSlides={true}
        flipEffect={{ slideShadows: false }}
        modules={[Autoplay, EffectFlip]}
        className="h-full w-full max-w-[500px] overflow-visible lg:flex-1 xl:max-w-[600px]"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide key={i} className="">
            <Image placeholder="blur" src={`/images/landing-${i + 1}.webp`} alt={`landing-image-${i}`} className="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        text={t("common.see-products")}
        pClassname={"text-sm py-1"}
        className={"w-full max-w-[500px] lg:hidden"}
      ></Button>
    </section>
  );
};

export default FirstLandingSection;
