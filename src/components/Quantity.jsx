import { useDispatch, useSelector } from "react-redux";
import { actionsShoppingCart } from "src/redux/reducers";

export function Quantity({ productId = "peluproduct", price = 420, stock = 25, className }) {
  const dispatch = useDispatch();
  const { addProudct, removeProduct } = actionsShoppingCart;
  const quantity = useSelector((state) => state.shoppingCart.products[productId]?.quantity);

  return (
    <div className="mx-auto flex w-fit gap-6">
      <button
        onClick={() => dispatch(removeProduct({ productId, price }))}
        disabled={!quantity && true}
        className={`goldGradient flex h-8 w-8  items-center justify-center rounded-full text-2xl text-white disabled:opacity-10  ${className}`}
      >
        <i className="ri-subtract-line"></i>
      </button>
      <h1>{quantity || 0}</h1>
      <button
        onClick={() => dispatch(addProudct({ productId, price }))}
        disabled={quantity === stock && true}
        className={`goldGradient flex h-8 w-8  items-center justify-center rounded-full text-2xl text-white disabled:opacity-40 ${className}`}
      >
        <i className="ri-add-line"></i>
      </button>
    </div>
  );
}
