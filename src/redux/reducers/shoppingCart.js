import { createSlice } from "@reduxjs/toolkit";
import { logos } from "src/assets";
import { getOfStorage } from "src/utils/localStorage";
import toast from "react-hot-toast";

const shoppingCart = createSlice({
  name: "shoppingCart",
  initialState: {
    products: {},
    promotionalCode: "",
    discount: 0,
    totalPrice: 0,
    finalPrice: false,
    discountAmount: 0,
  },
  reducers: {
    applyDiscount: (state, action) => {
      let aplied = false;
      const cartProducts = state.products;
      const validProducts = action.payload.products;
      const discount = action.payload.promotionalCode.discount;
      let discountAmountSum = 0;

      validProducts.map((p) => {
        if (cartProducts[p.productId]) {
          aplied = true;
          const originalPrice = cartProducts[p.productId].price;
          const discountAmount = (discount / 100) * cartProducts[p.productId].price;
          discountAmountSum += discountAmount;

          const discountPrice = originalPrice - discountAmount;
          const productCopy = {
            ...cartProducts[p.productId],
            discountPrice,
          };
          state.products = {
            ...state.products,
            [p.productId]: productCopy,
          };
        }
      });

      if (aplied) {
        state.promotionalCode = action.payload.promotionalCode;
        const newTotalPrice = Object.values(state.products).reduce((total, producto) => {
          if (producto.discountPrice) {
            return total + producto.discountPrice;
          } else {
            return total + producto.price;
          }
        }, 0);

        state.discountAmount = discountAmountSum;
        state.finalPrice = newTotalPrice;
        toast.success("Código promocional aplicado");
      } else {
        toast.error("No hay productos a los que aplicar el descuento");
      }
    },
    removeDiscount: (state) => {
      state.finalPrice = state.totalPrice;
      state.promotionalCode = "";
      Object.values(state.products).map((p) => {
        let product = { ...p };
        state.products[p.productId].discountPrice = false;
        return product;
      });
    },
    emptyCart: (state) => {
      state.products = {};
      state.totalPrice = 0;
      state.finalPrice = false;
    },
    saveSingInShoppingCart: (state, action) => {
      const { totalPrice, products } = action.payload;

      const productsDictionary = {};
      products.forEach((p) => {
        productsDictionary[p.productId] = {
          quantity: p.quantity,
          productId: p.productId,
          price: p.price,
          name: p.name,
          img: p.product?.images[0]?.path || logos.hydBlack,
        };
      });

      state.totalPrice = totalPrice;
      state.finalPrice = totalPrice;
      state.products = productsDictionary;
    },
    loadStorageShoppingCart: (state) => {
      const shoppingCart = getOfStorage("shoppingCart");
      if (shoppingCart?.totalPrice > 0) {
        const { totalPrice, products } = shoppingCart;
        state.totalPrice = totalPrice;
        state.finalPrice = totalPrice;
        state.products = products;
      }
    },
    addProudct: (state, action) => {
      const { productId, productName, price, productImg } = action.payload;
      const isAlready = state.products[productId]?.quantity;
      if (isAlready) {
        state.products[productId].quantity = isAlready + 1;
      } else {
        state.products[productId] = { quantity: 1, price: price, productId, name: productName, img: productImg };
      }
      const totalPrice = parseInt(state.totalPrice) + parseInt(price);
      state.totalPrice = totalPrice;
      state.finalPrice = totalPrice;
    },
    removeProduct: (state, action) => {
      const { productId, price } = action.payload;
      const productQuantity = state.products[productId]?.quantity;

      if (productQuantity === 1) {
        delete state.products[productId];
      } else {
        state.products[productId].quantity = productQuantity - 1;
      }
      const totalPrice = parseInt(state.totalPrice) - parseInt(price);
      state.totalPrice = totalPrice;
      state.finalPrice = totalPrice;
    },
  },
});

export const shoppingCartRdr = shoppingCart.reducer;
export const {
  saveSingInShoppingCart,
  loadStorageShoppingCart,
  addProudct,
  removeProduct,
  emptyCart,
  applyDiscount,
  removeDiscount,
} = shoppingCart.actions;
