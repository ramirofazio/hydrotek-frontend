export function Rating({ value = 2, size }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex w-fit gap-2">
      {stars.map((s, i) => (
        <i
          key={i}
          className={`${s <= value && "textGoldGradient text-transparent"} ri-star-fill text-gray-600 ${size}`}
        />
      ))}
    </div>
  );
}
