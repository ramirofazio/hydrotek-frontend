export function Rating({ value = 2 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex w-fit gap-1">
      {stars.map((s, i) => (
        <i key={i} className={`${s <= value ? "ri-star-fill" : "ri-star-line"} text-gold`} />
      ))}
    </div>
  );
}
