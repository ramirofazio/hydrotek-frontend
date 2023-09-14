export function Quantity({ quantity, setQuantity, stock, className }) {
  return (
    <div className="mx-auto flex w-fit gap-6">
      <button
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity <= 1 && true}
        className={`goldGradient flex h-8 w-8  items-center justify-center rounded-full text-2xl text-white disabled:opacity-40 ${className}`}
      >
        <i className="ri-subtract-line"></i>
      </button>
      <h1>{quantity || 0}</h1>
      <button
        onClick={() => setQuantity(quantity + 1)}
        disabled={quantity === stock && true}
        className={`goldGradient flex h-8 w-8  items-center justify-center rounded-full text-2xl text-white disabled:opacity-40 ${className}`}
      >
        <i className="ri-add-line"></i>
      </button>
    </div>
  );
}
