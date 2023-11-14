import { useDispatch } from "react-redux";
import { actionsShoppingCart } from "src/redux/reducers";
import { addProduct } from "src/components/notifications";

export function AddToCart({ productId, productImg, productName, price, className }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`text-3xl  text-white ${className}`}
      onClick={() => {
        dispatch(actionsShoppingCart.addProudct({ productId, productName, price }));
        addProduct({ name: productName, img: productImg });
      }}
    >
      <i className="ri-shopping-bag-fill w-10"></i>
    </button>
  );
}

// TODO Quantity & remove product
