import { useTranslation } from "react-i18next";
import { Avatar } from "src/components/user";

export function Comment({ publishDate, userName, userAvatar, comment }) {
  const { t } = useTranslation();
  return (
    <article className="">
      <span className="flex flex-row items-center  gap-2">
        <picture className="w-11 lg:w-16">
          <Avatar avatar={userAvatar} />
        </picture>
        <span className=" flex w-full flex-col sm:flex-row sm:items-center sm:gap-2">
          <h1 className="textGoldGradient w-fit text-sm lg:text-lg">
            {userName || "Pelusa Lombardo"}
            <h1 className="text-sm lg:text-lg">{`${t("blog.commented")}: `}</h1>
          </h1>
        </span>
      </span>
      <div className="mt-3 h-fit rounded-lg border-2 border-gold bg-black px-5 py-5">
        <p>{comment} </p>
      </div>
      <time className="my-1 font-primary text-xs text-white">{publishDate.slice(0, 10) || "05/04/2001"}</time>
    </article>
  );
}
