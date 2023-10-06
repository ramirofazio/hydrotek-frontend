import { defaultPost } from "assets";
import { useTranslation } from "react-i18next";

export function BlogPostCardMock({ img, title }) {
  const { t } = useTranslation();
  return (
    <article className="flex w-fit  flex-col items-center justify-items-center  gap-3">
      <div className=" flex  w-[80%] items-center bg-productBorderNoGradient bg-contain  bg-clip-content bg-no-repeat s:w-[65%]">
        <img className="m-5 w-[70%]" src={img || defaultPost} alt="" />
      </div>
      <h1 className=" mt-2 w-[80%] text-start s:w-[65%]">{title}</h1>
      <p className=" textGoldGradient w-fit font-primary text-sm uppercase underline decoration-gold transition hover:cursor-pointer hover:brightness-125 ">
        {t("footer.see-more")}
      </p>
    </article>
  );
}
