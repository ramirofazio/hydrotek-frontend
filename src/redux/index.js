import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartRdr } from './reducers';

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartRdr,
  },
});

export default store;