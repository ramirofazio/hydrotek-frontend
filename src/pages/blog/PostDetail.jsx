import { useLoaderData } from "react-router-dom";
import { defaultPost } from "src/assets";
import { useTranslation } from "react-i18next";
import { Comment } from "./Comment";
import { GoBack } from "src/components/buttons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { APIHydro } from "src/api";

export function PostDetail() {
  const { t } = useTranslation();
  const post = useLoaderData();
  const { session } = useSelector((state) => state.user);

  const mockPost = { imgs: null, title: null, text: null, date: null, comments: [1, 2, 3, 4, 5] };
  const { imgs, title, text, date, comments } = mockPost;

  const [comment, setComment] = useState("");

  function uploadComment() {
    if (!session.role) {
      return "popup";
    } else {
      //loader true
      APIHydro.uploadComment(session.userId, post.postId).then((res) => {
        return "se cargo su comentario";
      });
      //loader false
    }
  }

  return (
    <main className="mx-auto my-4 flex min-h-screen w-[92%] flex-col items-center  gap-7 px-4">
      <div className="self-end">
        <GoBack />
      </div>
      <section className="flex flex-col gap-4">
        <img className="w-full max-w-[750px]" src={imgs || defaultPost} alt="" />{" "}
        {/* // * Cambiar por slider/carrucel */}
        <h1 className="lg:text-3xl">{title || "aprende a cultivar hijo de deoss"}</h1>
        <div className="">
          <i className="ri-calendar-event-line textGoldGradient text-2xl lg:text-3xl"></i>
          <time className="textGoldGradient ml-2 lg:text-2xl">{date || "05/04/01"}</time>
        </div>
        <span className="lg:my-12">
          <h1>{title || "aprende a cultivar hijo de deoss"}</h1>
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
            sapiente suscipit, hic aut ullam! Distinctio natus ipsa ipsum provident minima vero ab placeat obcaecati.
            Repellendus non numquam error qui corrupti vitae earum odio vero nam perspiciatis magni nobis suscipit
            aspernatur adipisci sed fugiat facilis, architecto voluptatibus repudiandae illo a. Doloribus dignissimos
            nam ex fugiat. Voluptatum, ex dolor porro consequatur, reiciendis hic provident nobis harum sed laborum
            sunt! Natus recusandae accusantium reprehenderit at quo, cum iste exercitationem. Sed veritatis eligendi
            maiores fugiat dignissimos, omnis itaque. Vero pariatur quas culpa! Incidunt voluptatum unde in, dolorem
            numquam ipsa eveniet quis vitae hic nam perspiciatis veritatis, praesentium libero odio facere similique
            eligendi ducimus distinctio eum possimus provident consequuntur. Porro debitis quis aliquam natus provident,
            fugit odio perspiciatis assumenda qui numquam voluptatem, deserunt ducimus minima asperiores beatae nesciunt
            temporibus hic ex voluptatum at tempora eum quo ea id? Numquam. Consectetur reiciendis, doloremque molestiae
            possimus quisquam est eius deserunt dolor aliquam veniam soluta asperiores dolore. A animi, ipsa quae
            tenetur rem distinctio dolorum explicabo aspernatur commodi? Qui asperiores eligendi cumque. Mollitia, sunt
            officiis veritatis quam atque facere. Magni quo repellendus consequuntur. Vel minus, fugiat nam, labore
            repudiandae, officiis consectetur voluptatem incidunt quidem dolorum asperiores soluta earum blanditiis
            ipsam laborum placeat. Nulla at obcaecati in nemo alias? Sapiente quas, vero, esse corporis animi obcaecati
            cupiditate porro quia quae earum nam assumenda voluptates! Nihil, repellendus sed unde esse non iure
            reiciendis cum. Excepturi repellat, fuga magni necessitatibus obcaecati corrupti, ea saepe ad labore,
            sapiente omnis minima nemo rerum non ducimus harum temporibus itaque nisi iste porro error nostrum. Fugit ut
            veritatis excepturi! Laboriosam distinctio accusantium temporibus explicabo excepturi, in earum? Odit rem
            fuga eos voluptas odio cum inventore aperiam repellendus! Voluptatem perspiciatis numquam in totam nostrum
            accusamus voluptatum esse nihil. Neque, saepe? Velit iste officia eum soluta, dignissimos repudiandae vel
            illum, nesciunt doloremque ab veniam necessitatibus reprehenderit suscipit blanditiis at temporibus quod
            quasi quos sit? Dolores illo illum maxime modi nam minima. Iste quos excepturi libero ipsa commodi enim est
            eveniet amet repudiandae eos repellendus earum facilis, deleniti sed fugiat quae, mollitia aliquid similique
            necessitatibus, quidem labore ipsam? Laborum repellendus atque ducimus. Consectetur sed qui suscipit ipsum
            mollitia fuga veniam. Deserunt iusto, laboriosam vitae dolores quod saepe eos nesciunt obcaecati voluptate
            placeat beatae, accusamus architecto quam praesentium enim consequuntur ea! Aperiam, voluptate? Fuga
            sapiente voluptatem harum commodi magni laborum inventore mollitia cum iure ducimus numquam labore repellat
            nesciunt dolorem, libero eaque enim exercitationem iste aut odit sunt autem nihil illum rerum? Distinctio.
            Nihil cumque eum delectus possimus enim culpa rem beatae perferendis unde placeat, alias eaque quas modi
            consequuntur voluptatem optio ipsa iste illo quod. Veniam sint ut ex, temporibus laborum non? Autem dolor
            porro similique id ratione culpa odio deserunt voluptates? Provident dolore magnam tenetur, iste culpa ab
            eum! Molestias deleniti veniam facilis! Repellendus reprehenderit officiis ducimus vitae, itaque nisi
            repellat. Quaerat obcaecati ea, optio, impedit amet numquam voluptatem harum unde porro tempora neque velit
            ex cumque aperiam maiores a delectus, adipisci nisi quis. Magnam aut eos natus. Recusandae, earum excepturi.
            Maiores facilis aliquid suscipit rem, perferendis rerum quam, soluta sit porro voluptatum laborum ad
            veritatis qui consectetur ipsam, neque quia eaque harum ipsa natus molestias non dolore. Voluptatibus,
            deserunt alias! Officiis architecto eius iusto cumque ad doloribus, est tempore consectetur esse dolorum
            doloremque illum in. Nulla expedita nihil consequuntur doloribus ratione harum, neque dignissimos?
            Praesentium porro nemo iusto facere! Numquam. Magni quo, quibusdam sint eligendi et tempora, excepturi
            voluptate incidunt amet a dolor veniam voluptatem alias ullam nihil esse fuga? Dolorem odit aliquam
            consectetur dicta culpa corrupti, voluptatem obcaecati quos? Obcaecati quis corporis dignissimos consequatur
            atque! Error temporibus, nulla aliquid harum voluptatem exercitationem neque eveniet voluptatibus excepturi
            possimus nobis quia nihil perspiciatis! Perferendis officia saepe eius repudiandae ratione omnis ipsum. Sunt
            aut non dolores rerum voluptatibus molestiae omnis optio fugit, quis consequatur obcaecati quas facilis
            laudantium odit, asperiores autem, iure quae dicta! Laudantium, neque esse accusantium praesentium quas
            error corrupti? Doloremque cumque magni, quasi aliquid libero sit voluptate pariatur non impedit nulla
            magnam qui quisquam, quam possimus. Voluptatum provident libero dolore, tenetur ipsum necessitatibus nulla
            enim, accusantium dolorem blanditiis cupiditate! Quasi facere sequi inventore, sed praesentium hic
            necessitatibus nam, dolores suscipit aspernatur neque ducimus. Deserunt unde, quos consequatur explicabo
            expedita harum enim quaerat itaque sit debitis, ut, quas delectus quo! Illo suscipit molestias ratione
            accusamus officia eum deserunt dolores similique error reprehenderit impedit sit ipsum, voluptas perferendis
            doloribus eos illum! Ad dolores perferendis adipisci ex nam iusto dicta autem saepe. Vero repudiandae
            quaerat quod quia, in quas ea dicta, enim praesentium impedit fugiat recusandae rerum sed maxime magnam
            commodi assumenda similique cumque saepe illum hic exercitationem nam? Error, quaerat nesciunt! Provident
            eius iure voluptas consequuntur ipsum quasi ullam, repellat nisi veritatis quibusdam fugit aut aliquam
            incidunt optio facilis perferendis reprehenderit quas perspiciatis distinctio laudantium ut tempora ab
            temporibus! Fuga, iste? Architecto est recusandae, a earum praesentium veniam neque veritatis accusantium,
            enim labore iste quae eos debitis delectus optio officiis vel nesciunt sequi similique ullam repudiandae
            eligendi ipsum accusamus perferendis. Praesentium. Tempore corrupti sit, vero nihil similique perferendis, a
            ducimus, sequi minus fuga eum vitae nisi repudiandae beatae. Laboriosam, voluptate modi odio aliquam,
            reprehenderit consectetur recusandae cupiditate rem vero ea veniam. Maxime modi, aut temporibus accusantium
            quia neque architecto, reprehenderit minima laudantium, exercitationem illum vitae placeat? Corporis fuga
            cum quo delectus assumenda, architecto ipsa suscipit maiores aspernatur id dolor officia reprehenderit! Eum
            dolorem est modi ratione eligendi suscipit tempora, reiciendis aperiam! Earum alias libero deserunt magni
            delectus eveniet, a vero, soluta porro, nihil quis fuga doloribus? Magni dolores cumque error nemo. Officia,
            est expedita quo sapiente repellendus nihil iusto explicabo obcaecati nesciunt dolore, optio perspiciatis
            magnam delectus rem accusantium laborum unde ipsum quos sed rerum possimus molestias et ullam? Modi,
            dignissimos. Officiis iste atque ipsam recusandae eius nisi totam officia, commodi, excepturi cupiditate
            libero exercitationem laboriosam aspernatur in culpa earum molestiae dicta. Ab obcaecati, a saepe reiciendis
            accusantium non labore adipisci. Vel autem quasi dolorum corporis praesentium, odit maxime commodi vitae
            veritatis consequuntur, aperiam qui nesciunt minima exercitationem quas ducimus quibusdam ut accusantium in
            reprehenderit iste veniam. Cupiditate dolorum officiis dolores!
          </p>
        </span>
        <hr className="h-0.5 border-0 bg-gold" />
      </section>
      <section>
        <h1 className="mx-auto mb-6 w-fit lg:mb-10 lg:text-2xl">{t("blog.comments")}</h1>
        <div className="mb-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {comments.map((c, i) => (
            <Comment key={i} />
          ))}
        </div>
        <hr className="h-0.5 border-0 bg-gold" />
      </section>
      <span className="flex w-full flex-col items-center justify-center gap-6  lg:items-start lg:pl-8">
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
