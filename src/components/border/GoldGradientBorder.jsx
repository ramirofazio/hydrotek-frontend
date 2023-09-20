export function RoundedGoldGradientBorder({ children, width }) {
  return (
    <div className={`goldGradient aspect-square overflow-hidden rounded-full p-1 ${width}`}>
      <div className="aspect-square rounded-full border-2 border-transparent bg-base p-1">{children}</div>
    </div>
  );
}
