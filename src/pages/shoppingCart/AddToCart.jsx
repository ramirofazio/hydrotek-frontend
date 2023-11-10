import { useDispatch } from "react-redux";
import { actionsShoppingCart } from "src/redux/reducers";

export function AddToCart({ productId, productName, price, className }) {
  const dispatch = useDispatch();
  return (
    <button className={`text-3xl  text-white ${className}`} onClick={() => dispatch(actionsShoppingCart.addProudct({ productId, productName, price }))}>
      <i className="ri-shopping-bag-fill w-10"></i>
    </button>
  );
}

// TODO Quantity & remove product