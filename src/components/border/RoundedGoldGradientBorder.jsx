export function RoundedGoldGradientBorder({ children, width, blueGradient = true }) {
  return (
    <div className={`goldGradient aspect-square overflow-hidden rounded-full p-1 ${width}`}>
      <div className="aspect-square rounded-full border-2 border-transparent bg-base p-1">
        <div
          className={`blueGradient aspect-square rounded-full border-2 border-transparent p-1 ${
            !blueGradient && "hidden"
          }`}
        >
          {children}
        </div>
        {!blueGradient && children}
      </div>
    </div>
  );
}
