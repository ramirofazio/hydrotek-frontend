import { useLoaderData, useNavigate } from "react-router-dom";
import { defaultPost } from "src/assets";
import { useTranslation } from "react-i18next";
import { Comment } from "./Comment";
import { GoBack } from "src/components/buttons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { APIHydro } from "src/api";
import { Loader, Modal } from "src/components";
import { MustLogin } from "../../pages/session/MustLogin";
import { success, error } from "src/components/notifications";

export function PostDetail() {
  const { t } = useTranslation();
  const post = useLoaderData();
  console.log(post);
  const navigate = useNavigate();
  const { session } = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  function uploadComment() {
    if (!session.role) {
      setModal(true);
    } else {
      setLoading(true);
      APIHydro.uploadComment({ userId: session.id, postId: post.id, comment })
        .then((res) => {
          console.log(res);
          setLoading(false);
          success("Se cargo el comentario para su revisión");
          navigate(`/blog/${post.id}`); // ? en caso de no haber revisión de comentarios
        })
        .catch((e) => {
          console.log(e);
          error("error al cargar comentario");
        });
    }
  }

  return (
    <main className="mx-auto my-4 flex min-h-screen w-[92%] flex-col items-center  gap-7 px-4">
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <MustLogin />
      </Modal>
      <div className="self-end">
        <GoBack />
      </div>
      <section className="flex flex-col gap-4">
        <img className="w-full max-w-[750px]" src={defaultPost} alt="" />
        {/* // * Cambiar por slider/carrucel */}
        <h1 className="lg:text-3xl">{post?.title}</h1>
        <div className="">
          <i className="ri-calendar-event-line textGoldGradient text-2xl lg:text-3xl"></i>
          <time className="textGoldGradient ml-2 lg:text-2xl">{post?.publishDate.slice(0, 10)}</time>
        </div>
        <span className="lg:my-12">
          <h1>{post?.title}</h1>
          <p className="mt-4 sm:text-base sm:text-white">{post?.text}</p>
        </span>
        <hr className="h-0.5 border-0 bg-gold" />
      </section>
      <section className={`${post.postComments ? "inline" : "hidden"}`}>
        <h1 className="mx-auto mb-6 w-fit lg:mb-10 lg:text-2xl">{t("blog.comments")}</h1>
        <div className="mb-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {post.postComments?.map((c, i) => {
            if (c.show) {
              return (
                <Comment
                  userAvatar={c.user.profile.avatar}
                  userName={c.user.name}
                  comment={c.comment}
                  publishDate={c.publishDate}
                  key={i}
                />
              );
            }
          })}
        </div>
        <hr className="h-0.5 border-0 bg-gold" />
      </section>
      <span className="flex w-full flex-col items-center justify-center gap-6  lg:items-start lg:pl-8">
        {loading && <Loader />}
        <h1 className="text-2xl">{t("blog.leave-your-comment")}</h1>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          className="min-h-[10rem] w-full max-w-[600px] resize-none rounded-sm  border-2 border-gold bg-black px-2 py-1 text-white focus:outline-none lg:max-w-[750px]"
        />
        <button
          onClick={uploadComment}
          disabled={!comment.length && true}
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-1 uppercase tracking-widest  text-white transition hover:bg-opacity-75 disabled:bg-opacity-40"
        >
          <i className="ri-chat-2-fill text-xl text-white"></i>
          <h1 className="text-base text-white">{t("blog.comment")}</h1>
        </button>
      </span>
    </main>
  );
}
