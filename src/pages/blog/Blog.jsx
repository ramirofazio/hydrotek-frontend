import { BlogPostCard } from "components/cards";
import { Pagination } from "src/components";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionsUser } from "src/redux/reducers";
import { APIHydro } from "src/api";

export function Blog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let posts = useLoaderData();

  const { user } = useSelector((state) => state);
  const dictionary = {};
  user.savedPosts?.forEach((p) => (dictionary[p] = p));
  const [savedPosts, setSavedPosts] = useState(dictionary);
  useEffect(() => {

    return () => {
      dispatch(actionsUser.updateSavedPosts(Object.values(savedPosts)));
      console.log(Object.values(savedPosts))
      APIHydro.updateSavedPosts({ userId: user.session.id, postIds: Object.values(savedPosts) });
    };
  }, [savedPosts]);

  return (
    <main className="mx-auto mb-10 flex min-h-screen w-[92%] flex-col items-center justify-center">
      <h1 className="mb-8">{t("blog.our-blog")}</h1>
      {posts.length ? (
        <>
          <div className="grid  gap-12 px-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p, i) => {
              const { title, text, id, publishDate } = p;
              return (
                <BlogPostCard
                  date={publishDate}
                  saved={savedPosts[id]}
                  setSavedPosts={setSavedPosts}
                  title={title}
                  text={text}
                  id={id}
                  key={i}
                />
              );
            })}
          </div>
          <div className="my-8">
            <Pagination nButtons={3} />
          </div>
        </>
      ) : (
        <h2 className="mx-auto w-fit border-2">{t("blog.no-posts")}</h2>
      )}
    </main>
  );
}
