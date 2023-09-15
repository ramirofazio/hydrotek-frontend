import { logos } from "src/assets";

export function Avatar({ name, className, avatarWidth }) {
  return (
    <div className={`grid place-items-center gap-6 ${className}`}>
      <img src={logos.hydBlack} className={avatarWidth} />
      {name && <h1 className="textGoldGradient text-2xl">{name}</h1>}
    </div>
  );
}
