import { BlogPostCard } from "components/cards/";
import { useTranslation } from "react-i18next";
import { defaultPost, borders } from "src/assets";

export function BlogPost({ date, title, text, img = defaultPost }) {
  const { t } = useTranslation();
  return (
    <main className="border-2 border-orange-500 w-[90%]">
      <div className="">
        <img className="max-w-[300px]" src={borders.blogPostBorder} alt="" />
      </div>
      <div>
        <i className="ri-calendar-event-line textGoldGradient text-2xl"></i>
        <time className="textGoldGradient ml-2">{date || "05/04/01"}</time>
      </div>
      <span>
        <h1 className="my-3 text-base text-white">{title || "Como cultivar bien pro"}</h1>
        <p className="">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias tempore minima ad distinctio ex maiores
          atque autem. Quod assumenda sunt, vel voluptatibus error laudantium reiciendis perferendis mollitia a eum
          consequatur.
        </p>
        <p className="mt-2 textGoldGradient w-fit font-primary text-sm uppercase underline decoration-gold transition hover:cursor-pointer hover:brightness-125 ">
          {t("footer.see-more")}
        </p>
      </span>
    </main>
  );
}
