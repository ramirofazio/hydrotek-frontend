import { StarIcon } from "@heroicons/react/24/solid";

export function Rating({ value = 2 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex w-fit gap-1">
      {stars.map((s, i) => (
        <StarIcon
          key={i}
          className={`h-6 w-6 ${s <= value ? "stroke-none text-gold" : "stroke-gold text-transparent"}`}
        />
      ))}
    </div>
  );
}
