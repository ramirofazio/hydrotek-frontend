import { useTranslation } from "react-i18next";
import { defaultPost, borders } from "src/assets";
import { Link } from "react-router-dom";

export function BlogPostCard({
  id,
  date,
  showPreview = true,
  showSave = true,
  title,
  text,
  img = defaultPost,
  saved,
  setSavedPosts,
}) {
  const { t } = useTranslation();
  const textPreview = text?.slice(0, 100);

  return (
    <main className="relative ">
      {showSave && (
        <button
          onClick={() =>
            setSavedPosts((prev) => {
              let prevSaves = { ...prev };
              if (saved) {
                delete prevSaves[id];
              } else {
                prevSaves[id] = id;
              }
              console.log("SAVES: ", prevSaves);
              return prevSaves;
            })
          }
          className="goldGradient absolute left-[93%]  z-30 rounded-full px-1 py-[0.5px] lg:px-1.5 lg:py-1"
        >
          {saved ? (
            <i className="ri-bookmark-fill text-2xl  text-white lg:text-3xl"></i>
          ) : (
            <i className="ri-bookmark-line text-2xl text-white lg:text-3xl"></i>
          )}
        </button>
      )}
      <picture className="relative flex max-w-[300px] items-center justify-center md:max-w-[350px]">
        <img className="absolute -z-10 max-h-full max-w-full" src={img} alt="post_image" />
        <img className="bottom-1 max-w-full" src={borders.blogPostBorder} alt="post_border" />
      </picture>
      <div>
        <i className="ri-calendar-event-line textGoldGradient text-2xl"></i>
        <time className="textGoldGradient ml-2">{date?.slice(0, 10)}</time>
      </div>
      <span>
        <h1 className="my-3 text-base text-white">{title || "Como cultivar bien pro"}</h1>
        {showPreview && <p className="">{textPreview + " ..."}</p>}
        <Link to={`/blog/${id}`}>
          <p className="textGoldGradient mt-2 w-fit font-primary text-sm uppercase underline decoration-gold transition hover:cursor-pointer hover:brightness-125 ">
            {t("footer.see-more")}
          </p>
        </Link>
      </span>
    </main>
  );
}
