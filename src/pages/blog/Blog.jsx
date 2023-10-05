import { BlogPostCard } from "components/cards";
import { Pagination } from "src/components";
import { useTranslation } from "react-i18next";

export function Blog() {
  const { t } = useTranslation();
  const arr = [1, 2, 3, 4];
  return (
    <main className="mx-auto mb-10 flex min-h-screen w-[92%] flex-col items-center justify-center">
      <h1 className="mb-8">{t("blog.our-blog")}</h1>
      <div className="grid  gap-12 px-5 md:grid-cols-2 xl:grid-cols-3">
        {arr.map((b, i) => (
          <BlogPostCard key={i} />
        ))}
      </div>
      <div className="my-8">
        <Pagination nButtons={arr.length} />
      </div>
    </main>
  );
}
