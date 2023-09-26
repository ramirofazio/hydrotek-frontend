import { logos } from "src/assets";

export function Avatar({ avatar, name, className, avatarWidth }) {
  return (
    <div className={`grid place-items-center gap-6 ${className}`}>
      <img src={avatar || logos.hydBlack} className={`${avatarWidth} rounded-full`} />
      {name && <h1 className="textGoldGradient w-[70%] text-center text-2xl">{name}</h1>}
    </div>
  );
}
