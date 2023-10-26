import { t } from "i18next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "src/components/buttons";
import { APIHydro } from "src/api";
import { Loader } from "src/components";
import { BlogPostCard } from "src/components/cards";
import { actionsUser } from "src/redux/reducers";

export function MySavedPosts({ userId }) {
  //const savedPosts = useSelector((s) => s.user.savedPosts);
  const dispatch = useDispatch();
  const [savedPosts, setSavedPosts] = useState(false);
  const [dictionary, setDictionary] = useState(0);
  const [loader, setLoader] = useState(false);
  // Cpturar el ultimo estado || modificar logica para pedido a la api cada vez que se usa el btn
  useEffect(() => {
    if (!savedPosts) {
      //setLoader(true)
      APIHydro.getSavedPosts(userId).then((res) => {
        let dictionary = {};
        const rawPosts = res.data.map((p) => {
          dictionary[p.postId] = p.postId;
          return p.post;
        });
        setSavedPosts(rawPosts);

        setDictionary(dictionary);
        console.log(dictionary);
      });
      //setLoader(false)
    }
    // ? useRef solution
    const didUnmount = () => {
      // !Para que funcione hay que desactivar el "StrictMode" desde main.jsx
      console.log("se desmonto");
      console.log(dictionary);
      //dispatch(actionsUser.updateSavedPosts(Object.values(dictionary)));
      //APIHydro.updateSavedPosts({ userId, postIds: Object.values(dictionary) });
    };
    return didUnmount;
  }, [dictionary]);

  return (
    <main className="mx-8 grid place-items-center gap-2 overflow-hidden text-center sm:w-full sm:px-6 lg:mb-10  lg:w-full lg:place-items-start lg:pr-6">
      {loader && <Loader />}
      <h1 className="border-gold leading-5">{t("profile.savedPosts")}</h1>
      <div className="hidden w-full border-b-2 border-gold lg:inline" />
      <p className="mb-6">{t("profile.seeSavedPosts")}</p>
      {/* className="grid w-full gap-4 py-4 sm:grid-cols-2 sm:gap-10  lg:h-screen lg:overflow-y-scroll lg:pb-20 lg:pr-2" */}
      <section className="mb-20 grid  gap-12 px-5 md:grid-cols-2 xl:grid-cols-3">
        {savedPosts?.length &&
          savedPosts?.map((p, i) => {
            const { title, text, id, publishDate } = p;
            return (
              <BlogPostCard
                date={publishDate}
                saved={dictionary[id]}
                setSavedPosts={setDictionary}
                title={title}
                text={text}
                id={id}
                key={i}
              />
            );
          })}
        {!savedPosts.length && (
          <div className="col-span-2 flex w-full flex-col gap-4">
            <i className="ri-shopping-bag-fill icons text-4xl text-white" />
            <h2>Ninguna publicación guardada</h2>
            <Link to="/blog">
              <Button text={"Ver nuestro blog"} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
