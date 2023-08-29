import { Rating } from "components";

export function Review({ rating, userName }) {
  return (
    <div className="w-[90%] flex flex-col gap-3 rounded-md border-[1.5px] border-gold px-4 py-8">
      <Rating value={rating}/>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, mollitia! Nisi, aperiam? Inventore nulla dicta
        praesentium omnis, ut harum nemo esse? Velit, assumenda. Fugiat dicta deleniti ab similique eveniet vel.
      </p>
      <h1 className="textGoldGradient">{userName || "Tomas Perez"}</h1>
    </div>
  );
}
