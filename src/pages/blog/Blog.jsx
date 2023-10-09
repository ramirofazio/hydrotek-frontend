import { BlogPostCard } from "components/cards";
import { Pagination } from "src/components";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";

export function Blog() {
  const { t } = useTranslation();
  let posts = useLoaderData();

  return (
    <main className="mx-auto mb-10 flex min-h-screen w-[92%] flex-col items-center justify-center">
      <h1 className="mb-8">{t("blog.our-blog")}</h1>

      {posts.length ? (
        <>
          <div className="grid  gap-12 px-5 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((p, i) => {
              const { title, text, id, publishDate } = p;
              return <BlogPostCard date={publishDate} title={title} text={text} id={id} key={i} />;
            })}
          </div>
          <div className="my-8">
            <Pagination nButtons={3} />
          </div>
        </>
      ) : (
        <h2 className="w-fit mx-auto border-2">Lo sentimos, por el momento no hay posteos u.u</h2>
      )}
    </main>
  );
}
