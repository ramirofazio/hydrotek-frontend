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

export function PostDetail() {
  const { t } = useTranslation();
  const post = useLoaderData();
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
      APIHydro.uploadComment({ userId: session.id, postId: post.id, comment }).then((res) => {
        console.log(res);
        setLoading(false);
        navigate(`/blog/${post.id}`); // ? en caso de no haber revisión de comentarios
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
        <h1 className="lg:text-3xl">{post?.title || "aprende a cultivar hijo de deoss"}</h1>
        <div className="">
          <i className="ri-calendar-event-line textGoldGradient text-2xl lg:text-3xl"></i>
          <time className="textGoldGradient ml-2 lg:text-2xl">{post.publishDate.slice(0, 10) || "05/04/01"}</time>
        </div>
        <span className="lg:my-12">
          <h1>{post.text || "aprende a cultivar hijo de deoss"}</h1>
          <p className="mt-4 sm:text-base sm:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ut ipsum blanditiis sit veniam quibusdam,
            possimus quaerat est perspiciatis. Enim quos alias labore necessitatibus obcaecati, maxime iusto atque minus
            blanditiis! Labore illum nostrum placeat veritatis cumque dignissimos consequuntur id asperiores similique
            aspernatur? Sunt esse quis accusamus perferendis voluptatem libero culpa, impedit nesciunt, eius accusantium
            deserunt fuga excepturi perspiciatis debitis labore. Minus sapiente sed, rerum repellat ullam illo eum ea
            provident iusto vitae inventore quam iure nihil pariatur molestias sit possimus? Architecto cum distinctio
            rerum nobis deserunt accusantium explicabo sequi inventore! Fuga adipisci, architecto laboriosam aut nobis
            voluptatem cum voluptate quia pariatur, nostrum ullam cupiditate nisi quos, veritatis debitis labore
            reprehenderit repellat totam magni voluptas impedit doloribus modi. Eius, maiores sint. Officia tempora
            totam nulla, fuga beatae illum libero aut corporis non necessitatibus laboriosam dolorem commodi vitae
            doloribus ad culpa harum sunt ut maiores, eius ullam voluptas modi obcaecati. Minus, natus. Asperiores quam
            placeat velit mollitia labore cum. Officiis commodi ducimus, neque magni laborum sunt molestiae facere vel
            eligendi quis a voluptas tempora illum accusantium autem quam fugiat dolorem suscipit quisquam. Inventore
            placeat voluptatibus commodi facere sunt asperiores officiis, doloribus illo voluptas cupiditate in tempora
            eum vitae repudiandae ad minus. Maxime architecto nostrum nihil necessitatibus vitae nobis eveniet incidunt,
            exercitationem provident? Error architecto consectetur a sequi qui, accusamus, non aperiam nam aut quasi
            quas enim, debitis fugiat at. Enim repellendus unde totam voluptas tempore molestias laborum ducimus odit!
            Ab, voluptatibus eos! Corporis, possimus iure aspernatur voluptas voluptatum et maxime unde nostrum eaque
            quos molestiae hic, error itaque cumque, quas obcaecati earum voluptatibus inventore culpa doloribus facilis
            necessitatibus labore voluptatem maiores? Ipsam. Aliquam repellat voluptate ipsum ea harum assumenda laborum
            quia tempore perspiciatis sint quasi necessitatibus, sequi sapiente rerum expedita sit atque adipisci fugiat
            esse molestias eligendi, soluta eum. Et, labore perspiciatis. At vel odio ad dolorum totam! Atque dolorem
            praesentium, magni enim architecto asperiores similique. Ipsum quod facere quaerat non quo reprehenderit
            ratione eligendi, est qui assumenda, deleniti explicabo tenetur odit! Quas ea deleniti, perferendis quis
            vitae laudantium laborum soluta illo quo odio tenetur iusto eaque unde dolorum corporis eum dolorem iste
            dolor magni harum et vero provident exercitationem! Ab, minus? Fuga asperiores eaque libero animi officia
            corrupti, suscipit quisquam, saepe impedit adipisci repellat, molestias odit cumque. Quos repellendus sequi
            iusto in nam. Tempora veritatis tempore at modi! Vitae, sed voluptatibus? Fugit quidem officiis, cum,
            possimus velit totam animi consequatur perferendis sit iusto quasi iste voluptatum optio, incidunt sunt
            sapiente neque rerum id debitis facilis assumenda suscipit ullam magni quo. Id. Ex sit pariatur fugiat!
            Voluptatibus aut, quidem eveniet omnis qui odit distinctio unde debitis quas assumenda iusto aliquid, magni
            repellendus officia maiores non laborum, quis est animi similique fugiat perferendis. Veniam dolorum illum
            reiciendis mollitia inventore, tempora animi nesciunt deleniti dignissimos omnis nam enim soluta recusandae
            quisquam ipsum debitis commodi, facilis minus sunt beatae corrupti dolore? Commodi explicabo natus
            molestiae. Autem quae asperiores magnam culpa ab quia minus, neque non numquam harum repellat aliquid sit
          </p>
        </span>
        <hr className="h-0.5 border-0 bg-gold" />
      </section>
      <section className={`${post.postComments ? "inline" : "hidden"}`}>
        <h1 className="mx-auto mb-6 w-fit lg:mb-10 lg:text-2xl">{t("blog.comments")}</h1>
        <div className="mb-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {post.postComments?.map((c, i) => {
            console.log(c);
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
