import { BlogPost } from "./BlogPost";
import { useTranslation } from "react-i18next";
import { Pagination } from "src/components";

export function Blog() {
  const { t } = useTranslation();
  const arr = [1, 2, 3, 4];
  return (
    <main className="mx-auto min-h-screen w-[92%] ">
      <h1 className="mx-auto mb-8 w-fit">{t("blog.our-blog")}</h1>
      <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-3">
        {arr.map((b, i) => (
          <BlogPost key={i} />
        ))}
      </div>
      <div className="w-fit my-8 mx-auto">
        <Pagination nButtons={arr.length} />
      </div>
    </main>
  );
}
