import { logos } from "src/assets";

export function Avatar({ avatar, name, className, avatarWidth }) {
  return (
    <div className={`grid place-items-center gap-6 ${className}`}>
      <img src={avatar || logos.hydBlack} className={`${avatarWidth} aspect-square rounded-full`} />
      {name && <h1 className="textGoldGradient w-[70%] text-center text-xl leading-5">{name}</h1>}
    </div>
  );
}
