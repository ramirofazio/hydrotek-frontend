import { useTranslation } from "react-i18next";
import { defaultPost, borders } from "src/assets";
import { Link } from "react-router-dom";

export function BlogPostCard({ id = 1, date, showPreview = true, title /*text, img = defaultPost*/ }) {
  const { t } = useTranslation();
  return (
    <main className="">
      <picture className="relative flex max-w-[300px] items-center justify-center md:max-w-[350px]">
        <img className="absolute -z-10 max-h-full max-w-full" src={defaultPost} alt="post_image" />
        <img className="bottom-1 max-w-full" src={borders.blogPostBorder} alt="post_border" />
      </picture>
      <div>
        <i className="ri-calendar-event-line textGoldGradient text-2xl"></i>
        <time className="textGoldGradient ml-2">{date || "05/04/01"}</time>
      </div>
      <span>
        <h1 className="my-3 text-base text-white">{title || "Como cultivar bien pro"}</h1>
        {showPreview && (
          <p className="">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias tempore minima ad distinctio ex maiores
            atque autem. Quod assumenda sunt, vel voluptatibus error laudantium reiciendis perferendis mollitia a eum
            consequatur.
          </p>
        )}
        <Link to={`/blog/${id}`}>
          <p className="textGoldGradient mt-2 w-fit font-primary text-sm uppercase underline decoration-gold transition hover:cursor-pointer hover:brightness-125 ">
            {t("footer.see-more")}
          </p>
        </Link>
      </span>
    </main>
  );
}
