import { t } from "i18next";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "src/components/buttons";
import { APIHydro } from "src/api";
import { BlogPostCard } from "src/components/cards";
import { actionsUser } from "src/redux/reducers";

export function MySavedPosts({ userId }) {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const { posts, dictionary } = data;
  const [savedPosts, setSavedPosts] = useState(dictionary);
  const savedPostsRef = useRef(0);

  useEffect(() => {
    savedPostsRef.current = savedPosts;
  }, [savedPosts]);

  useEffect(() => {
    // ! Para que funcione adecuadamente hay que tener desactivado el React.strictmode en main.jsx
    return () => {
      dispatch(actionsUser.updateSavedPosts(Object.values(savedPostsRef.current)));
      APIHydro.updateSavedPosts({ userId: userId, postIds: Object.values(savedPostsRef.current) });
    };
  }, []);

  return (
    <main className="mx-8 grid place-items-center gap-2 overflow-hidden text-center sm:w-full sm:px-6 lg:mb-10  lg:w-full lg:place-items-start lg:pr-6">
      <h1 className="border-gold leading-5">{t("profile.savedPosts")}</h1>
      <div className="hidden w-full border-b-2 border-gold lg:inline" />
      <p className="mb-6">{t("profile.seeSavedPosts")}</p>
      <section className="mb-20 grid  gap-12 px-5 md:grid-cols-2 xl:grid-cols-3">
        {posts?.length
          ? posts?.map((p, i) => {
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
          })
          : null}
        {!posts.length && (
          <div className="col-span-2 flex w-full flex-col gap-4">
            <i className="ri-emotion-sad-line icons text-4xl text-white" />
            <h2>{t("blog.no-saved-posts")}</h2>
            <Link to="/blog">
              <Button text={"Ver nuestro blog"} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
