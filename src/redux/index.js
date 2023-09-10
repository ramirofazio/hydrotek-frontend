import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartRdr, appRdr } from './reducers';

const store = configureStore({
  reducer: {
    app: appRdr,
    shoppingCart: shoppingCartRdr,
  },
});

export default store;